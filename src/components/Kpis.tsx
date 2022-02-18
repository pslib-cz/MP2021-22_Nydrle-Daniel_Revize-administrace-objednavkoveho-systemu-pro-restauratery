import {
	faArrowDown,
	faArrowUp,
	faMinus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
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

interface Icons {
	orders: string
	incomes: string
}

const Kpis = (props: Props) => {
	const [orders, setOrders] = useState<Order>({ yesterday: 0, today: 0 })
	const [incomes, setIncomes] = useState<Income>({ yesterday: 0, today: 0 })
	const [orderDifference, setOrderDifference] = useState(0)
	const [incomeDifference, setIncomeDifference] = useState(0)
	const [numberOfOrders, setNumberOfOrders] = useState(0)
	const [icons, setIcons] = useState<Icons>({
		orders: "Minus",
		incomes: "Minus",
	})

	useEffect(() => {
		console.log(props)
		setOrders({
			today: props.kpiData[1]?.orders,
			yesterday: props.kpiData[0]?.orders,
		})
		setIncomes({
			today: +props.kpiData[1]?.revenue,
			yesterday: +props.kpiData[0]?.revenue,
		})

		setOrderDifference(orders.today - orders.yesterday)
		setIncomeDifference(incomes.today - incomes.yesterday)

		setNumberOfOrders(props.numberOfOrders)

		let orderIcon: string, incomeIcon: string
		if (orderDifference > 0) orderIcon = "ArrowUp"
		else if (orderDifference < 0) orderIcon = "ArrowDown"
		if (incomeDifference > 0) incomeIcon = "ArrowUp"
		else if (incomeDifference < 0) incomeIcon = "ArrowDown"
		setIcons({ orders: orderIcon!, incomes: incomeIcon! })
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

export default Kpis
