import { faPowerOff, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className="layout">
			<div className="menu">
				<nav className="menu-nav container">
					<h1 className="menu-nav-name">{restaurantData?.name}</h1>
					<NavLink
						to="/"
						className={(navData) =>
							navData.isActive
								? "menu-nav-link menu-nav-link--is-active"
								: "menu-nav-link"
						}>
						Domů
					</NavLink>
					<NavLink
						to="/items"
						className={(navData) =>
							navData.isActive
								? "menu-nav-link menu-nav-link--is-active"
								: "menu-nav-link"
						}>
						Sortiment
					</NavLink>
					<NavLink
						to="/orders"
						className={(navData) =>
							navData.isActive
								? "menu-nav-link menu-nav-link--is-active"
								: "menu-nav-link"
						}>
						Objednávky
					</NavLink>
					<NavLink
						to="/restaurant"
						className={(navData) =>
							navData.isActive
								? "menu-nav-link menu-nav-link--is-active"
								: "menu-nav-link"
						}>
						Provozovna
					</NavLink>
					{/* <NavLink to="/areas" className={(navData) =>
							navData.isActive ? "menu-nav-link menu-nav-link--is-active" : "menu-nav-link"
						}>
						Oblasti rozvozu
					</NavLink> */}
					<button
						onClick={() => {
							if (window.confirm("Opravdu se chcete odhlásit?"))
								logout()
						}}
						className="button button--delete menu-nav-logout-button">
						<FontAwesomeIcon icon={faPowerOff} />
					</button>
				</nav>
				<nav className="menu-nav--mobile container">
					<h1 className="menu-nav-name">{restaurantData?.name}</h1>
					<button
						className="button button--delete menu-nav--mobile-openburger"
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
							className="button button--delete menu-nav--mobile-closeburger"
							onClick={() => setIsSidebarOpen(false)}>
							<FontAwesomeIcon icon={faTimes} />
						</button>
						<NavLink
							to="/"
							className={(navData) =>
								navData.isActive
									? "menu-nav-link menu-nav-link--is-active"
									: "menu-nav-link"
							}
							onClick={() => setIsSidebarOpen(false)}>
							Domů
						</NavLink>
						<NavLink
							to="/items"
							className={(navData) =>
								navData.isActive
									? "menu-nav-link menu-nav-link--is-active"
									: "menu-nav-link"
							}
							onClick={() => setIsSidebarOpen(false)}>
							Sortiment
						</NavLink>
						<NavLink
							to="/orders"
							className={(navData) =>
								navData.isActive
									? "menu-nav-link menu-nav-link--is-active"
									: "menu-nav-link"
							}
							onClick={() => setIsSidebarOpen(false)}>
							Objednávky
						</NavLink>
						<NavLink
							to="/restaurant"
							className={(navData) =>
								navData.isActive
									? "menu-nav-link menu-nav-link--is-active"
									: "menu-nav-link"
							}
							onClick={() => setIsSidebarOpen(false)}>
							Provozovna
						</NavLink>
						{/* <NavLink to="/areas" className={(navData) =>
							navData.isActive ? "menu-nav-link menu-nav-link--is-active" : "menu-nav-link"
						} onClick={() => setIsSidebarOpen(false)}>
							Oblasti rozvozu
						</NavLink> */}
						<button
							onClick={() => {
								if (
									window.confirm(
										"Opravdu se chcete odhlásit?"
									)
								)
									logout()
							}}
							className="button button--delete menu-nav-logout-button">
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
				{new Date().getFullYear() !== 2022
					? `2022 – ${new Date().getFullYear()}`
					: 2022}
			</footer>
		</main>
	)
}
