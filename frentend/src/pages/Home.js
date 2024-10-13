import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { hendleSuccess } from "../util";

function Home() {

const [loggedUser,setloggedUser] = useState();

 const nevigate = useNavigate();

 useEffect(()=>{
  setloggedUser(localStorage.getItem('LoggdInUser'));
 },[]);

 const hendleLoggerOut = ()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('LoggdInUser');
  hendleSuccess('User Loggout ');
  setTimeout(()=>{
  nevigate('/login');
    },1000);
 }
  return (
    <div className='container'>
      <h1>{loggedUser}</h1>
      <button onClick={hendleLoggerOut}>Logout</button>

      <ToastContainer/>
    </div>
  )
}


export default Home