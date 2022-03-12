import { useEffect, useState } from "react"
import { api } from "../../config/api"
import { useRequireAuth } from "../auth/useRequireAuth"
import Order from "../../interfaces/IOrder"
import { OrdersTable } from "../OrdersTable"
import { useToken } from "../useToken"
import { useDidUpdateEffect } from "../functions/useDidUpdateEffect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { Loader } from "../Loader"

export const Orders = () => {
	document.title = "Objednávky"
	const [isLoading, setIsLoading] = useState(true)
	const [orders, setOrders] = useState<Order[]>([])
	const [pageCounter, setPageCounter] = useState<number>(1)
	const { token } = useToken()
	useRequireAuth()

	const getOrders = () => {
		setIsLoading(true)
		return api
			.get(`/order/all?count=10&page=${pageCounter}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				let _orders: Order[] = Object.values(response.data.data.orders)
				setOrders(_orders)
			})
	}

	useEffect(() => {
		Promise.all([getOrders()]).then(() => setIsLoading(false))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageCounter])

	return (
		<div className="page page-orders">
			<div className="page-orders-buttons">
				{!orders.find((o) => o.seq === 1) && (
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
			{isLoading ? <Loader /> : <OrdersTable orders={orders} />}
		</div>
	)
}
