import { useState } from "react"

const useToken = () => {
	const getToken = () => {
		const token = localStorage.getItem("mealgoAccessToken")
		return token
	}

	const saveToken = (userToken: string | null) => {
		if (userToken === null) {
			clearToken()
		} else {
			localStorage.setItem("mealgoAccessToken", userToken)
			setToken(userToken)
		}
	}

	const clearToken = () => {
		setToken(null)
		localStorage.removeItem("mealgoAccessToken")
	}

	const [token, setToken] = useState(getToken())

	return {
		setToken: saveToken,
		token,
		clearToken: clearToken,
	}
}

export default useToken
