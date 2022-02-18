import { faCheck, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const TrueFalseIcon = ({val}: any) => {
	return (
		val === null ? (
			<FontAwesomeIcon icon={faMinus} /> //null
		) : (
			val ? (
				<FontAwesomeIcon icon={faCheck} /> //true
			) : (
				<FontAwesomeIcon icon={faTimes} /> //false
			)
		)
	)
}

export default TrueFalseIcon