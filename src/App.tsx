import { Layout } from "./components/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./components/pages/Home"
import "./scss/main.scss"
import { Login } from "./components/Login"
import { useToken } from "./components/useToken"
import { Items } from "./components/pages/Items"
import { Orders } from "./components/pages/Orders"
import { Restaurant } from "./components/pages/Restaurant"
import { Areas } from "./components/pages/Areas"

function App() {
	const { token, setToken, clearToken } = useToken()

	if (token === undefined || token === null) {
		return (
			<div className="App">
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
			<div className="App">
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
