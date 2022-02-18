import React from "react"
import { useRequireAuth } from "../auth/useRequireAuth"

const Areas = () => {
	document.title = "Oblasti rozvozu"
	useRequireAuth()
	return <div>areas</div>
}

export default Areas
