import axios from "axios"
import React, { useEffect, useState, useContext, Dispatch } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { api } from "../config/api"
import Home from "./pages/Home"

const Login = ({ setToken }: any) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const login = () => {
		api.post("/login", { email, password })
			.then((response) => {
				if (response.data.success === 1) {
					setToken(response.data.data)
					navigate("/")
				}
			})
	}

	return (
		<div className="login">
			<h1 className="login-heading">Mealgo administrace</h1>
			<form onSubmit={(e) => e.preventDefault()} className="login-form">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="login-form-email"
					placeholder="E-mail"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="login-form-password"
					placeholder="Heslo"
					required
				/>
				<button onClick={login} className="login-form-button">
					Přihlásit se
				</button>
			</form>
		</div>
	)
}

export default Login
