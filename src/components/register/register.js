import React, { useState } from "react";
import "./register.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () =>{
    const navigate = useNavigate();
    const [user, setUser] = useState({
        Phone : "",
        name : "",
        email : "",
        password : "",
        reEnterPassword : ""
    });

    const handleChange = event =>{
        const {name, value} = event.target;
        setUser({
            ...user,
            [name] : value
        });
    };

    const URL = process.env.REACT_APP_URL;
    console.log("REGISTER URL:", `${URL}/register`);
    const register = () => {
        const {name, email, password, reEnterPassword } = user;
        /*const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;*/
    
        // Check for missing fields
        if (!name || !email || !password || !reEnterPassword) {
          alert("One or more fields are missing.");
          return;
        }
    
        // Check for password format
        /*if (!passwordRegex.test(password)) {
        alert("Password not in proper format. It should contain uppercase letter (A-Z), one digit (0-9), one special character from @$!%*?&, and have a total length of 8 or more characters. ");
          return;
        }*/
    
        if (password !== reEnterPassword) {
        alert("Passwords do not match.");
          return;
        }
    
        // If all checks pass, make the registration request
        axios
          .post(`${URL}/register`, user)
          .then((res) => {
            alert(res.data.message);
            navigate("/login");
          })
          .catch((err) => {
            console.log("Registration error:", err);
            alert("User already registered, please log in.");
          });
      };

    return(
        <div className="register">
            {console.log("User", user)}
        <h1>Register</h1>
        <input type="text" name="Phone" value={user.Phone}placeholder="Phone Number" onChange={handleChange} className="required" ></input>
        
        <input type="text" name="name" value={user.name}placeholder="Name" onChange={handleChange} ></input> 
        
        <input type="text" name="email" value={user.email}placeholder="Email" onChange={handleChange}></input> 
        
        <input type="password" name="password" value={user.password}placeholder="New password" onChange={handleChange}></input> 
        
        <input type="password" name="reEnterPassword" value={user.reEnterPassword}placeholder="Re-enter Password" onChange={handleChange}></input> 
        <div className="button" onClick={register}>Sign Up</div>
        <div class="dottedLine"></div>
        <div className="loginButton" onClick={() => navigate("/login")}>Login</div>  
        </div>
    )
};

export default Register;