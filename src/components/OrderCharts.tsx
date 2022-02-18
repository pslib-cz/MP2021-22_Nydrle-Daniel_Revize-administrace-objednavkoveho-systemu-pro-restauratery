import React, { useEffect, useRef, useState } from "react"
import IChartData from "../interfaces/IChartData"

import { Chart } from "react-chartjs-2"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js"
import * as clr from "../plugins/plugin.colors"
import IChartJsData from "../interfaces/IChartJsData"

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
)

interface Props {
	chartData: IChartData[]
}

const OrderCharts = (props: Props) => {
	const [chartData, setChartData] = useState<IChartData[]>([])
	const [incomeData, setIncomeData] = useState<IChartJsData>({
		labels: [],
		datasets: [],
		options: {},
	})
	const [orderData, setOrderData] = useState<IChartJsData>({
		labels: [],
		datasets: [],
		options: {},
	})
	const orderChartRef = useRef<ChartJS>(null)

	useEffect(() => {
		let chart = orderChartRef.current
		if (!chart) {
			return
		}

		setIncomeData({
			labels: props.chartData.map((c) => c.date),
			datasets: [
				{
					id: 1,
					type: "bar" as const,
					label: "Tržba",
					data: props.chartData.map((c) => c.revenue),
					backgroundColor: clr.getGradient(
						chart!.ctx,
						chart!.chartArea
					),
				},
			],
			options: {
				responsive: true,
			},
		})

		let _orderData = {
			labels: props.chartData.map((c) => c.date),
			datasets: [
				{
					id: "orders",
					order: 2,
					type: "line" as const,
					label: "Objednávky",
					yAxisID: "orders",
					data: props.chartData.map((c) => c.orders),
					fill: true,
					borderColor: clr.YELLOW,
					borderWidth: 0,
					backgroundColor: `${clr.YELLOW}66`,
					tension: 0.2,
				},
			],
			options: {
				responsive: true,
				interaction: {
					mode: "index",
					intersect: false,
				},
				stacked: false,
				scales: {
					yAxes: [
						{
							id: "orders",
							type: "linear" as const,
							position: "left",
						},
						{
							id: "averages",
							type: "linear" as const,
							position: "right" as const,
							grid: {
								drawOnChartArea: false,
							},
						},
					],
				},
			},
		}

		let averages: number[] = []

		props.chartData.forEach((c: IChartData) => {
			averages.push(parseInt(c.revenue) / c.orders)
		})

		setOrderData({
			..._orderData,
			datasets: [
				..._orderData.datasets,
				{
					id: "averages",
					order: 1,
					type: "line" as const,
					label: "Průměrná útrata",
					yAxisID: "averages",
					data: averages,
					fill: false,
					borderColor: clr.PINK,
					borderWidth: 5,
					backgroundColor: clr.PINK,
					tension: 0.3,
				},
			],
		})
	}, [props])

	return (
		<div className="charts">
			<div className="charts-chartcontainer">
				<Chart type="bar" data={{ ...incomeData }} />
			</div>
			<div className="charts-chartcontainer">
				<Chart
					type="line"
					ref={orderChartRef}
					datasetIdKey="order"
					data={orderData}
				/>
			</div>
		</div>
	)
}

export default OrderCharts
