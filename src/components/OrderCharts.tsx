import { useEffect, useRef, useState } from "react"
import IChartData from "../interfaces/IChartData"

import { Chart } from "react-chartjs-2"
import { Chart as ChartJS, registerables } from "chart.js"
import * as clr from "../plugins/plugin.colors"
import IChartJsData from "../interfaces/IChartJsData"

ChartJS.register(...registerables)

interface Props {
	chartData: IChartData[]
}

export const OrderCharts = (props: Props) => {
	const [revenueData, setRevenueData] = useState<IChartJsData>({
		labels: [],
		datasets: [],
		options: {},
	})
	const [orderData, setOrderData] = useState<IChartJsData>({
		labels: [],
		datasets: [],
		options: {},
	})
	const revenueChartRef = useRef<ChartJS>(null)

	useEffect(() => {
		let chart = revenueChartRef.current
		if (!chart) {
			return
		}

		let _revenueData = {
			labels: props.chartData.map((c) => c.date),
			datasets: [
				{
					id: "revenue",
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
				interaction: {
					mode: "index",
					intersect: false,
				},
				plugins: {
					tooltip: {
						callbacks: {
							label: (item: any) => {
								return `${item.dataset.label}: ${item.parsed.y} Kč`
							},
						},
					},
				},
				scales: {
					revenue: {
						position: "left",
						ticks: {
							callback: (value: number | string) => {
								return `${value} Kč`
							},
						},
						title: {
							display: true,
							text: "Tržba",
						},
					},
				},
			},
		}

		setRevenueData(_revenueData)

		let _orderData = {
			labels: props.chartData.map((c) => c.date),
			datasets: [
				{
					id: "orders",
					order: 2,
					type: "line" as const,
					label: "Počet objednávek",
					yAxisID: "orders",
					data: props.chartData.map((c) => c.orders),
					fill: true,
					borderColor: clr.YELLOW,
					borderWidth: 0,
					backgroundColor: `${clr.YELLOW}88`,
					tension: 0.4,
				},
			],
			options: {
				responsive: true,
				interaction: {
					mode: "index",
					intersect: false,
				},
				stacked: false,
				plugins: {
					tooltip: {
						callbacks: {
							label: (item: any) => {
								return item.dataset.label === "Průměrná útrata"
									? `${item.dataset.label}: ${item.parsed.y} Kč`
									: `${item.dataset.label}: ${item.parsed.y}`
							},
						},
					},
				},
				scales: {
					orders: {
						type: "linear",
						display: true,
						position: "left" as const,
						grid: {
							drawOnChartArea: false,
						},
						title: {
							display: true,
							text: "Počet objednávek",
						},
					},
					averages: {
						type: "linear",
						display: true,
						position: "right" as const,
					},
				},
			},
		}

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
					data: props.chartData.map((c) => {
						return Math.round(parseInt(c.revenue) / c.orders)
					}),
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
				<Chart
					type="bar"
					data={{ ...revenueData }}
					options={{
						...revenueData.options,
						scales: {
							...revenueData.options.scales,
						},
					}}
					ref={revenueChartRef}
				/>
			</div>
			<div className="charts-chartcontainer">
				<Chart
					type="line"
					data={orderData}
					options={{
						...orderData.options,
						scales: {
							...orderData.options.scales,
							averages: {
								position: "right",
								ticks: {
									callback: (value: number | string) => {
										return `${value} Kč`
									},
								},
								title: {
									display: true,
									text: "Průměrná útrata",
								},
							},
						},
					}}
				/>
			</div>
		</div>
	)
}
