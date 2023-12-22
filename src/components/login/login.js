import React, { useState } from "react";
import "./login.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = ({setLoginUser}) =>{
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email : "",
        password : "",
    });

    const handleChange = event =>{
        const {name, value} = event.target;
        setUser({
            ...user,
            [name] : value
        })
    }
    const URL = process.env.REACT_APP_URL;
    console.log("LOGIN URL:", `${URL}/login`);
    const login = () =>{
        axios.post(`${URL}/login`, user)
        .then(res => {
            const {  user: loggedInUser } = res.data;
            

            if (loggedInUser) {
                setLoginUser(loggedInUser);
                localStorage.setItem("loggedInUser",JSON.stringify(loggedInUser));
                navigate("/", { state: { userName: loggedInUser.name } }); // Pass the user's name as state
            }
        });
    };

    return(
        <div className="login">
            {console.log(user)}
            <h1>Expenser</h1>
            <input type="text" placeholder="Email Address" name="email" value={user.email} onChange={handleChange}></input> 
            <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange}></input> 
            <div className="button" onClick={login}>Login</div>
            <div class="dottedLine"></div>
            <div className="registerButton" onClick={() => navigate("/register")}>Create New Account</div>  
            </div>
    )
};

export default Login;