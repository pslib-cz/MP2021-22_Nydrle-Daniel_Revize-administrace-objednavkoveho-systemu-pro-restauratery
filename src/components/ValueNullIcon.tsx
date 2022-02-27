import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ValueNullIcon = ({ val }: any) => {
	return val === "" || val !== null ? (
		<FontAwesomeIcon icon={faMinus} />
	) : (
		<span>{val}</span>
	)
}
