import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ValueNullIcon = ({val}: any) => {
	console.log(val);
	return (
		val === "" ? (
			<FontAwesomeIcon icon={faMinus}/>
		) : (
			<span>{val}</span>
		)
	)
}

export default ValueNullIcon