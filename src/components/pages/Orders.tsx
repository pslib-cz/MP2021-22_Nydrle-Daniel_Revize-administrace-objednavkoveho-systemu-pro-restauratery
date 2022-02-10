import React, { useState } from 'react'
import { tableData } from '../../data/data'
import { useRequireAuth } from '../auth/useRequireAuth'
import OrdersTable from '../OrdersTable'

const Orders = () => {
	document.title = "Objednávky"
	const [tableOrders, setTableOrders] = useState(tableData)
	useRequireAuth()
	return (
		<div className="page page-orders">
			<OrdersTable {...JSON.parse(JSON.stringify(tableOrders))} />
		</div>
	)
};

export default Orders