import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

const RefreshHendler = ({setIsAuthorize}) => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
          setIsAuthorize(true);
            if(location.pathname === '/'||
               location.pathname === '/login' || 
               location.pathname === '/signup' )
               {
                navigate ('/home',{replace:false});
            }
        }
    },[location,navigate,setIsAuthorize]
);
  return (
    null
  )
}

export default RefreshHendler
