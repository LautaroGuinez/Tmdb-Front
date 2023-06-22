import React from "react";
import "../styles/Forms.css"

const LoginForm=()=> {

    return(
        <div>
            <form className="loginForm">
             <p>User Name</p>
             <input></input>  
             <p>Password</p>
             <input></input> 
             <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm