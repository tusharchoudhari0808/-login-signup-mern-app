import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
 import { handleError, hendleSuccess } from "../util";

function Login() {

  const [LoginInfo, setLoginInfo] = useState({
   
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...LoginInfo, [name]: value });
  };

  const nevigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const {  email, password } = LoginInfo;
    
    // Uncomment this part to handle empty fields

    if ( !email) {
      return handleError("email required ");
    }
    else if ( !password) {
      return handleError("password required ");
    }
    
    try{
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo),
    })
    
    const data = await response.json();
    const {success,message,jwtToken,name,error}  = data;
    if(success){
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('LoggdInUser', name);
      hendleSuccess(message);
      setTimeout(() => {
        nevigate('/home');
      }, 1000);
    }
    else if (error){
      const details = error?.details[0].message;
      handleError(details);
    }
    else if (!success){
      handleError(message);
    }
   
    console.log(data);
  }
    catch(err){
      handleError(err)
    }

    // Proceed with sign-up logic
    // console.log("Signing up with: ", SignUpInfo);
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Enter your email .."
            value={LoginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password .."
            value={LoginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Doesn't have an account? <Link to="/singup">SingUp</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
