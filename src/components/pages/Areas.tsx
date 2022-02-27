import { useRequireAuth } from "../auth/useRequireAuth"

export const Areas = () => {
	document.title = "Oblasti rozvozu"
	useRequireAuth()
	return <div>areas</div>
}
