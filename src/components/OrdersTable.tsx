import React, { useEffect, useState } from "react";

interface Props {
	orders: Order[];
}

interface Order {
	time: Date;
	price: number;
	phone: string;
	items: Item[];
	name: string;
	address: string;
}

interface Item {
	amount: number;
	name: string;
}

const OrdersTable = (props: Props) => {
	const [orders, setOrders] = useState<Order[]>(props.orders);
	return (
		<table>
			<thead>
				<tr>
					<th>Čas</th>
					<th>Cena</th>
					<th>Telefon</th>
					<th>Položky</th>
					<th>Jméno</th>
					<th>Adresa</th>
					<th>Akce</th>
				</tr>
			</thead>
			<tbody>
				{orders.map((order: Order) => {
					{
						return (
							<tr>
								<td>{order.time}</td>
								<td>{order.price}</td>
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

export default OrdersTable;
