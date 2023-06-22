import React, { useState } from "react";
import axios from 'axios';
import "../styles/Forms.css"

const RegisterForm=()=> {
    const [username , setUserName] = useState("")
    const [userMail , setUserMail] = useState("")
    const [password , setPassword] = useState("")
    const [user , setUser] = useState({})

    const userData = {
        name : username , 
        email : userMail , 
        password :password
    }
    console.log(userData);
    
    const handlerRegister = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/api/routes/users" , userData)
        .then((res)=>console.log(res.data.user))
        .catch(error => {
            console.error("Error creating user:", error)})
    }

    return( 
        <div>
            <form className="registerForm" onSubmit={handlerRegister}>
             <p>User Name</p>
             <input onChange={(e) => setUserName(e.target.value)}></input> 
             <p>Mail</p>
             <input onChange={(e) => setUserMail(e.target.value)}></input> 
             <p>Password</p>
             <input onChange={(e) => setPassword(e.target.value)}></input> 
             <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm