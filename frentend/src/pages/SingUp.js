import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
 import { handleError, hendleSuccess } from "../util";

function SignUp() {

  const [SignUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...SignUpInfo, [name]: value });
  };

  const nevigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = SignUpInfo;
    
    // Uncomment this part to handle empty fields
    if (!name ) {
      return handleError("name is required .");
    }
    else if ( !email) {
      return handleError("email required ");
    }
    else if ( !password) {
      return handleError("password required ");
    }
    
    try{
      const url = "https://login-signup-mern-app-a.vercel.app/auth/signup";
      const response = await fetch(url, {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SignUpInfo),
    })
    
    const data = await response.json();
    const {success,message,error}  = data;
    if(success){
      hendleSuccess(message);
      setTimeout(() => {
        nevigate('/login');
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name .."
            value={SignUpInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Enter your email .."
            value={SignUpInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password .."
            value={SignUpInfo.password}
          />
        </div>
        <button type="submit">Sign Up</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
