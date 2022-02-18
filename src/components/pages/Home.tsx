import { useEffect, useState } from "react"
import Kpis from "../Kpis"
import OrdersTable from "../OrdersTable"
import OrderCharts from "../OrderCharts"
import { useRequireAuth } from "../auth/useRequireAuth"
import useToken from "../useToken"
import { api } from "../../config/api"
import Order from "../../interfaces/IOrder"
import ChartData from "../../interfaces/IChartData"

const Home = () => {
	document.title = ""
	const [orders, setOrders] = useState<Order[]>([])
	const [chartData, setChartData] = useState<ChartData[]>([])
	const [kpiData, setKpiData] = useState<ChartData[]>([])
	const [numberOfOrders, setNumberOfOrders] = useState<number>(0)
	const { token } = useToken()
	useRequireAuth()

	useEffect(() => {
		api.get("/order/all?count=5", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			let _orders: Order[] = Object.values(response.data.data)
			setOrders(_orders)
			setNumberOfOrders(_orders[_orders.length - 1].seq)
		})

		api.get("/order/stats", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			let _chartData: ChartData[] = Array.from(response.data.data)
			setChartData(_chartData)
			console.log(_chartData.slice(Math.max(_chartData.length - 2, 0)))
			setKpiData(_chartData.slice(Math.max(_chartData.length - 2, 0)))
		})
	}, [])

	return (
		<div className="page page-home">
			<OrdersTable orders={orders} />
			<Kpis kpiData={kpiData} numberOfOrders={numberOfOrders} />
			<OrderCharts chartData={chartData} />
		</div>
	)
}

export default Home
