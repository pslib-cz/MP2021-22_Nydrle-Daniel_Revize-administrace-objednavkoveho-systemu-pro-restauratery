import { useEffect, useState } from "react"
import IChartData from "../interfaces/IChartData"
import { Kpi } from "./Kpi"

interface Props {
	kpiData: IChartData[]
	numberOfOrders: number
}

interface Order {
	today: number
	yesterday: number
}

interface Income {
	today: number
	yesterday: number
}

export const Kpis = (props: Props) => {
	const [orders, setOrders] = useState<Order>({ yesterday: 0, today: 0 })
	const [incomes, setIncomes] = useState<Income>({ yesterday: 0, today: 0 })
	const [numberOfOrders, setNumberOfOrders] = useState(0)

	useEffect(() => {
		setOrders({
			today: props.kpiData[1]?.orders,
			yesterday: props.kpiData[0]?.orders,
		})
		setIncomes({
			today: +props.kpiData[1]?.revenue,
			yesterday: +props.kpiData[0]?.revenue,
		})

		setNumberOfOrders(props.numberOfOrders)
	}, [props])

	return (
		<div className="kpi">
			<Kpi
				name={"Objednávky dnes"}
				today={orders.today}
				yesterday={orders.yesterday}
				showDifference={true}
				showCurrency={false}
			/>
			<Kpi
				name={"Objednávky celkem"}
				today={numberOfOrders}
				yesterday={null}
				showDifference={false}
				showCurrency={false}
			/>
			<Kpi
				name={"Tržba dnes"}
				today={incomes.today}
				yesterday={incomes.yesterday}
				showDifference={true}
				showCurrency={true}
			/>
		</div>
	)
}
