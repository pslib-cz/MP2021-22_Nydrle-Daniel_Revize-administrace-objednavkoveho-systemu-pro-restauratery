import { faClock, faDollarSign, faHashtag, faHome, faList, faPhoneAlt, faSmile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

interface Props {
	orders: Order[]
}

interface Order {
	time: Date
	price: number
	phone: string
	items: Item[]
	name: string
	address: string
}

interface Item {
	amount: number
	name: string
}

const OrdersTable = (props: Props) => {
	const [orders, setOrders] = useState<Order[]>(props.orders)
	return (
		<table className="table ordertable">
			<thead className="table-header ordertable-header">
				<tr>
					<th><FontAwesomeIcon icon={faHashtag}/>Objednávka</th>
					<th><FontAwesomeIcon icon={faClock} /> Čas</th>
					<th><FontAwesomeIcon icon={faDollarSign} /> Cena</th>
					<th><FontAwesomeIcon icon={faPhoneAlt} /> Telefon</th>
					<th><FontAwesomeIcon icon={faList} /> Položky</th>
					<th><FontAwesomeIcon icon={faSmile} /> Jméno</th>
					<th><FontAwesomeIcon icon={faHome} /> Adresa</th>
				</tr>
			</thead>
			<tbody className="table-body ordertable-body">
				{orders.map((order: Order) => {
					{
						return (
							<tr>
								<td>#12345</td>
								<td>{order.time}</td>
								<td>{order.price}&nbsp;Kč</td>
								<td>{order.phone}</td>
								<td>
									{order.items.map((item: Item) => {
										{return (
											<div>
												{item.amount}× {item.name}
											</div>
										)}
									})}
								</td>
								<td>{order.name}</td>
								<td>{order.address}</td>
							</tr>
						);
					}
				})}
			</tbody>
		</table>
	);
};

export default OrdersTable
