import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IBusinessHour from "../interfaces/IBusinessHour"

export const BusinessHour = (businessHour: IBusinessHour) => {
	return (
		<tr>
			<td className="day">{businessHour.name}</td>
			<td className="indicator">
				{businessHour.open && businessHour.close ? (
                    <FontAwesomeIcon icon={faCheck} />
                ) : (
                    <FontAwesomeIcon icon={faTimes} />
                )}
			</td>
			<td className="open">{businessHour.open}</td>
			<td className="close">{businessHour.close}</td>
		</tr>
	)
}
