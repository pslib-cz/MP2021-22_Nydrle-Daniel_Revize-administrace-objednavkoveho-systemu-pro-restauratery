import {
	faCalendarDay,
	faDoorOpen,
	faHourglassEnd,
	faHourglassStart,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { api } from "../../config/api"
import IBusinessHour from "../../interfaces/IBusinessHour"
import Category from "../../interfaces/ICategory"
import RestaurantData from "../../interfaces/IRestaurant"
import { useRequireAuth } from "../auth/useRequireAuth"
import { BusinessHour } from "../BusinessHour"
import { Loader } from "../Loader"
import { TrueFalseIcon } from "../TrueFalseIcon"
import { useToken } from "../auth/useToken"

export const Restaurant = (props: any) => {
	const [isLoading, setIsLoading] = useState(true)
	const [restaurantData, setRestaurantData] = useState<RestaurantData>()
	const [mixedCategory, setMixedCategory] = useState<Category>()
	const [businessHours, setBusinessHours] = useState<IBusinessHour[]>([])

	document.title = "Provozovna"
	useRequireAuth()
	const { token } = useToken()

	const getRestaurant = () => {
		api.get("/property", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			setRestaurantData(response.data.data)
			let _hours: any[] = Object.values(response.data.data.hours)
			let _days: string[] = Object.keys(response.data.data.hours)
			let _businessHours: IBusinessHour[] = []
			_days.forEach((value: string, i: number) => {
				if (_hours[i][0]) {
					_businessHours.push({
						name: value,
						open: Object.keys(_hours[i][0])[0],
						close: Object.values(_hours[i][0])[0],
					})
				} else {
					_businessHours.push({
						name: value,
						open: null,
						close: null,
					})
				}
			})
			let map = [
				{ english: "Mon", czech: "Pondělí" },
				{ english: "Tue", czech: "Úterý" },
				{ english: "Wed", czech: "Středa" },
				{ english: "Thu", czech: "Čtvrtek" },
				{ english: "Fri", czech: "Pátek" },
				{ english: "Sat", czech: "Sobota" },
				{ english: "Sun", czech: "Neděle" },
			]
			_businessHours.forEach((value: IBusinessHour, i: number) => {
				value.name = map.filter(
					(x) => x.english === value.name
				)[0].czech
			})
			setBusinessHours(_businessHours)
		})
		api.get("/category/all", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			let _categories: Category[] = Object.values(response.data.data)

			let _mixedCategory = _categories.filter((c: Category) => {
				if (c.id === restaurantData?.mix_item_cat) return c
				return null
			})[0]

			setMixedCategory(_mixedCategory)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		getRestaurant()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [restaurantData])

	return (
		<div className="page page-restaurant">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className="left">
						<section className="page-restaurant-section-general">
							<header className="page-restaurant-section-header">
								<h2 className="page-restaurant-section-header-heading">
									Obecná nastavení
								</h2>
							</header>
							<div className="table-container">
								<table className="table restauranttable">
									<thead className="table-header">
										<tr>
											<td colSpan={2}>&nbsp;</td>
										</tr>
									</thead>
									<tbody className="table-body">
										<tr>
											<td>Název provozovny</td>
											<td>{restaurantData?.name}</td>
										</tr>
										<tr>
											<td>Adresa provozovny</td>
											<td>{restaurantData?.address}</td>
										</tr>
										<tr>
											<td>Telefon</td>
											<td>{restaurantData?.phone}</td>
										</tr>
										<tr>
											<td>Platební metody</td>
											<td className="payments">
												<section>
													<span>Hotovost</span>
													<TrueFalseIcon
														val={
															restaurantData
																?.pymt[0]
														}
													/>
												</section>
												<section>
													<span>Karta</span>
													<TrueFalseIcon
														val={
															restaurantData
																?.pymt[1]
														}
													/>
												</section>
												<section>
													<span>Stravenky</span>
													<TrueFalseIcon
														val={
															restaurantData
																?.pymt[2]
														}
													/>
												</section>
												<section>
													<span>Online</span>
													<TrueFalseIcon
														val={
															restaurantData?.onlinepay_meta
														}
													/>
												</section>
											</td>
										</tr>
										<tr>
											<td>Zobrazovat kód jídla</td>
											<td>
												<TrueFalseIcon
													val={
														restaurantData?.show_item_code
													}
												/>
											</td>
										</tr>
										<tr>
											<td>Zobrazovat složení jídel</td>
											<td>
												<TrueFalseIcon
													val={
														restaurantData?.show_ingreds
													}
												/>
											</td>
										</tr>
										<tr>
											<td>
												Upozornění na nové objednávky
												emailem
											</td>
											<td>
												<TrueFalseIcon
													val={
														restaurantData?.send_emails
													}
												/>
											</td>
										</tr>
										<tr>
											<td>Půlená pizza</td>
											<td>
												Zapnuto pro{" "}
												<b>{mixedCategory?.name}</b>
											</td>
										</tr>
										<tr>
											<td>Poznámka - hlavička stránky</td>
											<td>
												{
													restaurantData?.options
														.memo_head
												}
											</td>
										</tr>
										<tr>
											<td>
												Poznámka - potvrzení objednávky
											</td>
											<td>
												{
													restaurantData?.options
														.memo_2_left
												}
											</td>
										</tr>
										<tr>
											<td>Facebook</td>
											<td>
												{
													restaurantData?.options
														.social_links.fb
												}
											</td>
										</tr>
										<tr>
											<td>Instagram</td>
											<td>
												{
													restaurantData?.options
														.social_links.ig
												}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>
					</div>
					<div className="right">
						<section className="page-restaurant-section-hours">
							<header className="page-restaurant-section-header">
								<h2 className="page-restaurant-section-header-heading">
									Příjem objednávek
								</h2>
							</header>
							<div className="table-container">
								<table className="table">
									<thead className="table-header">
										<tr>
											<th>
												<FontAwesomeIcon
													icon={faCalendarDay}
												/>
												Den
											</th>
											<th>
												<FontAwesomeIcon
													icon={faDoorOpen}
												/>
												Otevřeno
											</th>
											<th>
												<FontAwesomeIcon
													icon={faHourglassStart}
												/>
												Začátek
											</th>
											<th>
												<FontAwesomeIcon
													icon={faHourglassEnd}
												/>
												Konec
											</th>
										</tr>
									</thead>
									<tbody className="table-body">
										{businessHours.map(
											(b: IBusinessHour) => {
												return <BusinessHour {...b} />
											}
										)}
									</tbody>
								</table>
							</div>
						</section>
						<section className="page-restaurant-section-account">
							<header className="page-restaurant-section-header">
								<h2 className="page-restaurant-section-header-heading">
									Nastavení účtu
								</h2>
							</header>
							<div className="table-container">
								<table className="table">
									<thead className="table-header">
										<tr>
											<td colSpan={2}>&nbsp;</td>
										</tr>
									</thead>
									<tbody className="table-body">
										<tr>
											<td>Jméno</td>
											<td>demo</td>
										</tr>
										<tr>
											<td>Nové heslo</td>
											<td>
												<input type="password" />
											</td>
										</tr>
										<tr>
											<td>Nové heslo znovu</td>
											<td>
												<input type="password" />
											</td>
										</tr>
										<tr>
											<td>E-mail</td>
											<td>{restaurantData?.email}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>
					</div>
				</>
			)}
		</div>
	)
}
