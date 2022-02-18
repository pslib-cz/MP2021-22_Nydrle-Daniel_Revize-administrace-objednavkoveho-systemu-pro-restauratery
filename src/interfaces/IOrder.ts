import IDelivery from "./IDelivery"
import IDeliveryItem from "./IDeliveryItem"

export default interface IOrder {
	address: string
	app_mode: number
	customer: number
	date: string
	delivery: IDelivery
	email: string
	id: number
	id_prop: number
	items: IDeliveryItem[]
	name: string
	note: string
	payment: number
	phone: string
	px: number
	seq: number
}
