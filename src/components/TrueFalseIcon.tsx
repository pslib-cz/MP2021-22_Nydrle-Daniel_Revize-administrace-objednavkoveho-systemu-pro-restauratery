import { faCheck, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const TrueFalseIcon = ({val}: any) => {
	return (
		val === null ? (
			<FontAwesomeIcon icon={"minus"} /> //null
		) : (
			val ? (
				<FontAwesomeIcon icon={"check"} /> //true
			) : (
				<FontAwesomeIcon icon={"times"} /> //false
			)
		)
	)
}

export default TrueFalseIcon