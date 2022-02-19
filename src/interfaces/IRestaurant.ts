export default interface IRestaurant {
	active: number
	address: string
	dlv_text: string
	email: string
	hours: {
		Mon: object[]
		Tue: object[]
		Wed: object[]
		Thu: object[]
		Fri: object[]
		Sat: object[]
		Sun: object[]
	}
	id: number
	last_poll: null
	location: string
	mix_item_cat: number
	name: string
	onlinepay_meta: string,
	options: {
		delivery: object[]
		html_include_head: string
		memo_head: string,
		memo_2_left: string,
		social_links: {
			fb: string
			ig: string
		}
	}
	phone: string
	print_enabled: number
	priv: string
	pymt: string
	send_emails: number
	show_ingreds: number
	show_item_code: number
	url: string
}
