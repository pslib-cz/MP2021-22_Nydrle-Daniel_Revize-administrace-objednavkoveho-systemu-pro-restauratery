import {
	faClock,
	faDollarSign,
	faHashtag,
	faHome,
	faList,
	faPhoneAlt,
	faSmile,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import IDeliveryItem from "../interfaces/IDeliveryItem"
import IOrder from "../interfaces/IOrder"

interface Props {
	orders: IOrder[]
}

const OrdersTable = (props: Props) => {
	useEffect(() => {
		setOrders(Object.values(props.orders))
	}, [props])

	const [orders, setOrders] = useState<IOrder[]>([])
	return (
		<div className="table-container ordertable-container">
			<table className="table ordertable">
				<thead className="table-header ordertable-header">
					<tr>
						<th>
							<FontAwesomeIcon icon={"hashtag"} />
							Objednávka
						</th>
						<th>
							<FontAwesomeIcon icon={"clock"} /> Čas
						</th>
						<th>
							<FontAwesomeIcon icon={"dollar-sign"} /> Cena
						</th>
						<th>
							<FontAwesomeIcon icon={"phone-alt"} /> Telefon
						</th>
						<th>
							<FontAwesomeIcon icon={"list"} /> Položky
						</th>
						<th>
							<FontAwesomeIcon icon={"smile"} /> Jméno
						</th>
						<th>
							<FontAwesomeIcon icon={"home"} /> Adresa
						</th>
					</tr>
				</thead>
				<tbody className="table-body ordertable-body">
					{orders.map((order: IOrder) => {
						{
							return (
								<tr key={order.seq}>
									<td>#{order.seq}</td>
									<td>{order.date}</td>
									<td>{order.px}&nbsp;Kč</td>
									<td>{order.phone}</td>
									<td>
										{order.items.map(
											(item: IDeliveryItem) => {
												{
													return (
														<div key={item.id}>
															{item.qty}&times;{" "}
															{item.name}
														</div>
													)
												}
											}
										)}
									</td>
									<td>{order.name}</td>
									<td>{order.address}</td>
								</tr>
							)
						}
					})}
				</tbody>
			</table>
		</div>
	)
}

export default OrdersTable
