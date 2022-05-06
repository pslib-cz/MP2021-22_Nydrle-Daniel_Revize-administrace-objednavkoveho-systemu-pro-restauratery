import { useEffect, useState } from "react"
import { Kpis } from "../Kpis"
import { OrdersTable } from "../OrdersTable"
import { OrderCharts } from "../OrderCharts"
import { useRequireAuth } from "../auth/useRequireAuth"
import { useToken } from "../auth/useToken"
import { api } from "../../config/api"
import IOrder from "../../interfaces/IOrder"
import IChartData from "../../interfaces/IChartData"
import { Loader } from "../Loader"

export const Home = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [orders, setOrders] = useState<IOrder[]>([])
	const [chartData, setChartData] = useState<IChartData[]>([])
	const [kpiData, setKpiData] = useState<IChartData[]>([])
	const [numberOfOrders, setNumberOfOrders] = useState<number>(0)
	const { token } = useToken()
	useRequireAuth()

	const getOrders = () => {
		return api
			.get("/order/all?count=5", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				let _orders: IOrder[] = Object.values(response.data.data.orders)
				console.log(response.data.data.orders)
				setOrders(_orders)
				setNumberOfOrders(response.data.data.total)
			})
	}

	const getStats = () => {
		return api
			.get("/order/stats", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				let _chartData: IChartData[] = Array.from(response.data.data)
				setChartData(_chartData)
				setKpiData(_chartData.slice(Math.max(_chartData.length - 2, 0)))
			})
	}

	useEffect(() => {
		setIsLoading(true)
		Promise.all([getOrders(), getStats()]).then(() => setIsLoading(false))
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
