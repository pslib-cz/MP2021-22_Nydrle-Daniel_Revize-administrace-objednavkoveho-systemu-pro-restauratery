import { useEffect, useState } from "react"
import { Kpis } from "../Kpis"
import { OrdersTable } from "../OrdersTable"
import { OrderCharts } from "../OrderCharts"
import { useRequireAuth } from "../auth/useRequireAuth"
import { useToken } from "../useToken"
import { api } from "../../config/api"
import Order from "../../interfaces/IOrder"
import ChartData from "../../interfaces/IChartData"
import { Loader } from "../Loader"

export const Home = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [orders, setOrders] = useState<Order[]>([])
	const [chartData, setChartData] = useState<ChartData[]>([])
	const [kpiData, setKpiData] = useState<ChartData[]>([])
	const [numberOfOrders, setNumberOfOrders] = useState<number>(0)
	const { token } = useToken()
	useRequireAuth()

	const getOrders = () => {
		setIsLoading(true)
		api.get("/order/all?count=5", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			let _orders: Order[] = Object.values(response.data.data.orders)
			console.log(response.data.data.orders)
			setOrders(_orders)
			setNumberOfOrders(response.data.data.total)
		})
	}

	const getStats = () => {
		api.get("/order/stats", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			let _chartData: ChartData[] = Array.from(response.data.data)
			setChartData(_chartData)
			setKpiData(_chartData.slice(Math.max(_chartData.length - 2, 0)))
			setIsLoading(false)
		})
	}

	useEffect(() => {
		getOrders()
		getStats()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="page page-home">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<OrdersTable orders={orders} />
					<Kpis kpiData={kpiData} numberOfOrders={numberOfOrders} />
					<OrderCharts chartData={chartData} />
				</>
			)}
		</div>
	)
}
