import React, { useEffect, useLayoutEffect, useState } from "react"
import { api } from "../../config/api"
import { useRequireAuth } from "../auth/useRequireAuth"
import Order from "../../interfaces/IOrder"
import OrdersTable from "../OrdersTable"
import useToken from "../useToken"
import UseDidUpdateEffect from "../functions/UseDidUpdateEffect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

const Orders = () => {
	document.title = "Objednávky"
	const [orders, setOrders] = useState<Order[]>([])
	const [pageCounter, setPageCounter] = useState<number>(1)
	const { token } = useToken()
	useRequireAuth()

	useEffect(() => {
		api.get(`/order/all?count=10&page=1`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			let _orders: Order[] = Object.values(response.data.data.orders)
			setOrders(_orders)
		})
	}, [])

	UseDidUpdateEffect(() => {
		api.get(`/order/all?count=10&page=${pageCounter}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			let newOrders: Order[] = []
			newOrders = Object.values(response.data.data.orders)
			setOrders(newOrders)
		})
	}, [pageCounter])

	return (
		<div className="page page-orders">
			<div className="page-orders-buttons">
				{!orders.find(o => o.seq === 1) && (
					<button
						className="button page-orders-buttons-button page-orders-buttons-button-previous"
						onClick={() => {
							let temp = pageCounter
							++temp
							setPageCounter(temp)
						}}>
						<FontAwesomeIcon icon={faChevronLeft} />
						starší
					</button>
				)}
				{pageCounter > 1 && (
					<button
						className="button page-orders-buttons-button page-orders-buttons-button-next"
						onClick={() => {
							let temp = pageCounter
							--temp
							setPageCounter(temp)
						}}>
						novější
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				)}
			</div>
			<OrdersTable orders={orders} />
		</div>
	)
}

export default Orders
