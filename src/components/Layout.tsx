import { faPowerOff } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { api } from "../config/api"
import IRestaurant from "../interfaces/IRestaurant"
import { useToken } from "./useToken"

export const Layout = ({ children, clearToken, ...rest }: any) => {
	const navigate = useNavigate()
	const { token } = useToken()
	const [restaurantData, setRestaurantData] = useState<IRestaurant>()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const getRestaurantData = () => {
		api.get("/property", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			setRestaurantData(response.data.data)
		})
	}

	const logout = () => {
		clearToken()
		navigate("/")
	}

	useEffect(() => {
		getRestaurantData()
	})

	return (
		<main className="layout">
			<div className="menu">
				<nav className="menu-nav container">
					<h1 className="menu-nav-name">{restaurantData?.name}</h1>
					<Link to="/" className="menu-nav-link">
						Domů
					</Link>
					<Link to="/items" className="menu-nav-link">
						Sortiment
					</Link>
					<Link to="/orders" className="menu-nav-link">
						Objednávky
					</Link>
					<Link to="/restaurant" className="menu-nav-link">
						Provozovna
					</Link>
					{/* <Link to="/areas" className="menu-nav-link">
						Oblasti rozvozu
					</Link> */}
					<button
						onClick={() => {
							if (window.confirm("Opravdu se chcete odhlásit?"))
								logout()
						}}
						className="menu-nav-logout-button">
						<FontAwesomeIcon icon={faPowerOff} />
					</button>
				</nav>
				<nav className="menu-nav--mobile container">
					<h1 className="menu-nav-name">{restaurantData?.name}</h1>
					<button
						className="button menu-nav--mobile-openburger"
						onClick={() => setIsSidebarOpen(true)}>
						<span></span>
						<span></span>
						<span></span>
					</button>
					<nav
						className={`menu-nav--mobile-sidebar ${
							isSidebarOpen ? "is-open" : "is-closed"
						}`}>
						<button
							className="button menu-nav--mobile-closeburger"
							onClick={() => setIsSidebarOpen(false)}>
							&times;
						</button>
						<Link
							to="/"
							className="menu-nav-link"
							onClick={() => setIsSidebarOpen(false)}>
							Domů
						</Link>
						<Link
							to="/items"
							className="menu-nav-link"
							onClick={() => setIsSidebarOpen(false)}>
							Sortiment
						</Link>
						<Link
							to="/orders"
							className="menu-nav-link"
							onClick={() => setIsSidebarOpen(false)}>
							Objednávky
						</Link>
						<Link
							to="/restaurant"
							className="menu-nav-link"
							onClick={() => setIsSidebarOpen(false)}>
							Provozovna
						</Link>
						{/* <Link to="/areas" className="menu-nav-link" onClick={() => setIsSidebarOpen(false)}>
							Oblasti rozvozu
						</Link> */}
						<button
							onClick={() => {
								if (
									window.confirm(
										"Opravdu se chcete odhlásit?"
									)
								)
									logout()
							}}
							className="menu-nav-logout-button">
							<FontAwesomeIcon icon={faPowerOff} />
						</button>
					</nav>
				</nav>
			</div>
			<div className="container">
				<Outlet />
			</div>
			<footer className="container">
				&copy;
				<a
					href="https://mealgo.cz"
					target={"_blank"}
					rel={"noreferrer"}>
					Mealgo
				</a>
				2022
			</footer>
		</main>
	)
}
