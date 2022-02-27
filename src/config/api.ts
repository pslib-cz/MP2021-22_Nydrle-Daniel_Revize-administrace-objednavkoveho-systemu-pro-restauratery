import axios, { AxiosInstance } from "axios"

export const api: AxiosInstance = axios.create({
	baseURL: "https://next.mealgo.cz/data",
	headers: { "Content-Type": "application/json" },
})
