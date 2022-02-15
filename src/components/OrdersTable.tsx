import { faClock, faDollarSign, faHashtag, faHome, faList, faPhoneAlt, faSmile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import DeliveryItem from "../interfaces/DeliveryItem";
import Order from "../interfaces/Order";

interface Props {
	orders: Order[]
}

const OrdersTable = (props: Props) => {
	useEffect(() => {
	  setOrders(Object.values(props.orders))
	}, [props])
	
	const [orders, setOrders] = useState<Order[]>([])
	return (
		<div className="table-container ordertable-container">
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
								<tr key={order.seq}>
									<td>#{order.seq}</td>
									<td>{order.date}</td>
									<td>{order.px}&nbsp;Kč</td>
									<td>{order.phone}</td>
									<td>
										{order.items.map((item: DeliveryItem) => {
											{return (
												<div key={item.id}>
													{item.qty}&times; {item.name}
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
		</div>
	);
};

export default OrdersTable
