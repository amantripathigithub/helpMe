import React from 'react'
import Toaster, { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    
	const navigate = useNavigate();

	// States for registration
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	
	const handleName = (e) => {
		setName(e.target.value);
	//	setSubmitted(false);
	};

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
        const url='https://helpme-server3.onrender.com/register';
        const data ={name:name,email:email,password:password};
        axios.post(url,data).then((res)=>{
            const exist = res.data.exist;
            if(exist==="1"){
                toast.error(email + " is already  registered !!");
            }else{
                const saved= res.data.saved;
                if(saved==="1"){
                    toast.success(name + " is successfully registered !!");
					navigate('/Login');
                    
                }else{
                    toast.error("ERROR  try after sometime !!");
                }
            }
        }).catch((err)=> {
            toast.error("server is down try after sometime !!");
        })
    }

    const check_inputs=()=>{
        if(name==='' || email==='' || password===''){
            return 0;
        }
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && password.length>=6 )
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
		<div >
            
			<div>
				<h1>User Registration</h1>
			</div>

			{/* Calling to the methods */}

			<form>
				{/* Labels and inputs for form data */}
				<label className="label">Name</label>
				<input onChange={handleName} className="input"
					value={name} type="text" />

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
	);
}
