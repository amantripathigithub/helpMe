import React from 'react'
//import { Cookies } from 'react-cookie';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Profile() {

  const navigate = useNavigate();

  //const [cookies , setCookie]  = useCookies(['user']);
  const email = Cookies.get('email');
  console.log(email)
  const helpMe=()=>{
    navigate('/map');
  }
  return (
    <div>
       <div>
       
       <button onClick={helpMe} className="btn"
						type="submit">
					Help Me
				</button>     
       
        
      </div>
    </div>
  )
}
