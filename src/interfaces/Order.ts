import Delivery from "./Delivery";
import DeliveryItem from "./DeliveryItem";

export default interface Order {
	address: string
	app_mode: number
	customer: number
	date: string
	delivery: Delivery
	email: string
	id: number
    id_prop: number
	items: DeliveryItem[]
	name: string
    note: string
    payment: number
    phone: string
    px: number
    seq: number
}