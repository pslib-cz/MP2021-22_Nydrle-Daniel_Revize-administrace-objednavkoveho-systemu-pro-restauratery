import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

const ValueNullIcon = ({ val }: any) => {
	return val === "" ? <FontAwesomeIcon icon={"minus"} /> : <span>{val}</span>
}

export default ValueNullIcon
