import { useState } from "react"
import { tableData, incomeData, orderData } from "../../data/data"
import OrderChange from "../OrderChange"
import OrdersTable from "../OrdersTable"
import OrderCharts from "../OrderCharts"
import { useRequireAuth } from "../auth/useRequireAuth"
import useToken from "../useToken"

const Home = () => {
	document.title = ""
	const [tableOrders, setTableOrders] = useState(tableData)
	const {token} = useToken()
    useRequireAuth()

	return (
		<div className="page page-home">
			<OrdersTable {...JSON.parse(JSON.stringify(tableOrders))} />
			<OrderChange orders={orderData.datasets[0].data.slice(-2)} incomes={incomeData.datasets[0].data.slice(-2)} />
			<OrderCharts />
		</div>
	);
};

export default Home
