import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToken } from "../useToken"

export const useRequireAuth = (redirectTo: string = "/") => {
	const { token } = useToken()

	let navigate = useNavigate()

	useEffect(() => {
		if (token === null) navigate(redirectTo)
	}, [token, redirectTo, navigate])
}
