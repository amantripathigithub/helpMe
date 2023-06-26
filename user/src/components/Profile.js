import React from 'react'
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  const navigate = useNavigate();

  const [cookies , setCookie]  = useCookies(['user']);
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
