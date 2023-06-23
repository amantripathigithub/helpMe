import React from 'react'
import {useCookies} from 'react-cookie';

export default function Profile() {

  const [cookies , setCookie]  = useCookies(['user']);

  return (
    <div>
       <div>
       
        
        <p>{cookies.password}</p>
        
      </div>
    </div>
  )
}
