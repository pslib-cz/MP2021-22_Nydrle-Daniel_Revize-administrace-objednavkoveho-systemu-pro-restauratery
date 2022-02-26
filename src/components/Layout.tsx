import { faPowerOff } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"

const Layout = ({ children, clearToken, ...rest }: any) => {
	const navigate = useNavigate()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const logout = () => {
		clearToken()
		navigate("/")
	}
	return (
		<main className="layout">
			<div className="menu">
				{/* <header className="menu-header">
                    <h1 className="menu-header-name">Restaurace Na Zkušební</h1>
                    <button onClick={() => logout()} className="menu-header-logout-button"><FontAwesomeIcon icon={faPowerOff}/></button>
                </header>
                <nav className="menu-items">
                    <Link to="/" className='menu-items-item'>Domů</Link>
                    <Link to="/items" className='menu-items-item'>Sortiment</Link>
                    <Link to="/orders" className='menu-items-item'>Objednávky</Link>
                    <Link to="/restaurant" className='menu-items-item'>Provozovna</Link>
                    <Link to="/areas" className='menu-items-item'>Oblasti rozvozu</Link>
                </nav> */}
				<nav className="menu-nav container">
					<h1 className="menu-nav-name">Restaurace Na Zkušební</h1>
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
					<Link to="/areas" className="menu-nav-link">
						Oblasti rozvozu
					</Link>
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
					<h1 className="menu-nav-name">Restaurace Na Zkušební</h1>
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
						<Link to="/areas" className="menu-nav-link">
							Oblasti rozvozu
						</Link>
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
			<footer className="container"></footer>
		</main>
	)
}

export default Layout
