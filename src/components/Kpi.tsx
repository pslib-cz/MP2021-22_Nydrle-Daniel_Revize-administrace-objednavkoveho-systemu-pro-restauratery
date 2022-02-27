import {
	faArrowDown,
	faArrowUp,
	faMinus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Kpi = (values: {
	name: string
	today: number
	yesterday: number | null
	showDifference: boolean
	showCurrency: boolean | null
}) => {
	return (
		<div className="kpi-box">
			<h5 className="kpi-box-heading">{values.name}</h5>
			<div className="kpi-box-values">
				<h4 className="kpi-box-values-value">
					{values.today}
					{values.showCurrency && <span>&nbsp;Kč</span>}
				</h4>
				{values.showDifference && values.yesterday !== null && (
					<div className="kpi-box-values-difference">
						<small className="kpi-box-values-difference-value">
							{values.today - values.yesterday}
							{values.showCurrency && <span>&nbsp;Kč</span>}
						</small>

						{values.today > values.yesterday && (
							<FontAwesomeIcon icon={faArrowUp} />
						)}
						{values.today < values.yesterday && (
							<FontAwesomeIcon icon={faArrowDown} />
						)}
						{values.today === values.yesterday && (
							<FontAwesomeIcon icon={faMinus} />
						)}
					</div>
				)}
			</div>
		</div>
	)
}
