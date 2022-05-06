import { Layout } from "./components/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./components/pages/Home"
import "./scss/main.scss"
import { Login } from "./components/pages/Login"
import { useToken } from "./components/auth/useToken"
import { Items } from "./components/pages/Items"
import { Orders } from "./components/pages/Orders"
import { Restaurant } from "./components/pages/Restaurant"
import { Areas } from "./components/pages/Areas"
import { useEffect, useState } from "react"
import { Theme } from "./interfaces/ETheme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { BLUE, WHITE } from "./plugins/plugin.colors"
import { Chart } from "chart.js"

function App() {
	const { token, setToken, clearToken } = useToken()
	const [theme, setTheme] = useState<Theme>(Theme.Light)

	const toggleTheme = () => {
		switch (theme) {
			case Theme.Dark:
				setTheme(Theme.Light)
				localStorage.setItem("mealgoTheme", Theme.Light)
				break
			case Theme.Light:
				setTheme(Theme.Dark)
				localStorage.setItem("mealgoTheme", Theme.Dark)
				break
			default:
				break
		}
	}

	useEffect(() => {
		if (localStorage.getItem("mealgoTheme") !== null) {
			switch (localStorage.getItem("mealgoTheme")) {
				case Theme.Light:
					setTheme(Theme.Light)
					break
				case Theme.Dark:
					setTheme(Theme.Dark)
					break
				default:
					break
			}
		} else {
			window.matchMedia("(prefers-color-scheme: dark)").matches
				? localStorage.setItem("mealgoTheme", "dark")
				: localStorage.setItem("mealgoTheme", "light")
		}
	}, [])

	useEffect(() => {
		Chart.defaults.color = theme === Theme.Light ? BLUE : WHITE
	}, [theme])

	if (token === undefined || token === null) {
		return (
			<div className="App" data-theme={theme.toString()}>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<Login
									setToken={(tkn: string) => setToken(tkn)}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		)
	} else {
		return (
			<div className="App" data-theme={theme.toString()}>
				<button
					className="button button--change-theme"
					onClick={() => {
						toggleTheme()
					}}>
					{theme === Theme.Dark && <FontAwesomeIcon icon={faSun} />}
					{theme === Theme.Light && <FontAwesomeIcon icon={faMoon} />}
				</button>
				<BrowserRouter>
					<Routes>
						<Route element={<Layout clearToken={clearToken} />}>
							<Route index element={<Home />} />
							<Route path="/items" element={<Items />} />
							<Route path="/orders" element={<Orders />} />
							<Route
								path="/restaurant"
								element={<Restaurant />}
							/>
							<Route path="/areas" element={<Areas />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
