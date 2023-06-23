import React from 'react'
import Toaster, { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';

export default function Login() {

  const navigate = useNavigate();



  
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

    const [cookies , setCookie]  = useCookies(['user']);

	


	// Handling the email change
	const handleEmail = (e) => {
		setEmail(e.target.value);
	//	setSubmitted(false);
	};

	// Handling the password change
	const handlePassword = (e) => {
		setPassword(e.target.value);
	//	setSubmitted(false);
	};

   

    let fetchData=()=>{
        const url='https://helpme-server1.onrender.com/login';
        const data ={email:email,password:password};
        axios.post(url,data).then((res)=>{
            const exist = res.data.exist;
            const ok = res.data.ok;
            console.log(exist);
            console.log(ok);
            if(exist===1 && ok===1){
                toast.success("Login is success !! ");
                setCookie('email' ,email ,{path:'/'});
                setCookie('password',password,{path:'/'});
                navigate('/profile');
            }else{
                
                if(exist===1 && ok!=1){
                    toast.error("wrong password !!");
                    
                }else{
                    toast.error("user does not exist sign up first !!");
                    navigate('/Signup');
                }
            }
        }).catch((err)=> {
            toast.error("server is down try after sometime !!");
        })
    }

    const check_inputs=()=>{
        if(email==='' || password===''){
            return 0;
        }
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) )
            {
                return (true)
            }
        

        else return 0;
    }
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (check_inputs()===0) {
	
        toast.error("fill entries correctly !! ");
		} else {
		//	setSubmitted(true);
		//	setError(false);
        fetchData();
        
		}
	};





  return (
    <div>
     <div>
				<h1>User Login</h1>
			</div>

			{/* Calling to the methods */}

			<form>
			
				<label className="label">Email</label>
				<input onChange={handleEmail} className="input"
					value={email} type="email" />

				<label className="label">Password</label>
				<input onChange={handlePassword} className="input"
					value={password} type="password" />

				<button onClick={handleSubmit} className="btn"
						type="submit">
					Submit
				</button>
			</form>
    </div>
  )
}
