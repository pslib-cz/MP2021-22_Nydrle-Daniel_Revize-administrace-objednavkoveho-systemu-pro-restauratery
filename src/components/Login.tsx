import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { api } from '../config/api';
import Home from './Home';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [log, setLog] = useState("");

    useEffect(() => {
        if (success) {
            window.location.replace("/home");
        }
        else if (email != "" && password != "") {
            alert("Neplatné přihlášení")
        }
    }, [success])

    const login = () => {
        let inputData:object = {email, password}

        api.post("/login", inputData)
        .then(response => {
            console.log(response.data)
            setSuccess(response.data.success)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className='login'>
            <h1 className='login-heading'>Mealgo administrace</h1>
            <form onSubmit={e => e.preventDefault()} className='login-form'>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='login-form-email' placeholder='E-mail' required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='login-form-password' placeholder='Heslo' required />
                <button onClick={login} className='login-form-button'>Přihlásit se</button>
            </form>
        </div>
    )
}

export default Login
