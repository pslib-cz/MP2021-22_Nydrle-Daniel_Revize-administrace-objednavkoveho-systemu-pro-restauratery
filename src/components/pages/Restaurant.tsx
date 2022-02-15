import {
	faCalendarDay,
	faCheck,
	faDoorOpen,
	faHourglassEnd,
	faHourglassStart,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import Category from "../../interfaces/Category";
import RestaurantData from "../../interfaces/Restaurant";
import { useRequireAuth } from "../auth/useRequireAuth";
import TrueFalseIcon from "../TrueFalseIcon";
import useToken from "../useToken";

const Restaurant = (props: any) => {
	const [restaurantData, setRestaurantData] = useState<RestaurantData>();
	const [mixedCategory, setMixedCategory] = useState<Category>();

	document.title = "Provozovna";
	useRequireAuth();
	const { token } = useToken();

	useEffect(() => {
		api.get("/property", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			console.log(response.data.data);
			setRestaurantData(response.data.data);
		});
	}, [props]);

	useEffect(() => {
		api.get("/category/all", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			let _categories: Category[] = Object.values(response.data.data);

			let _mixedCategory = _categories.filter((c: Category) => {
				if (c.id === restaurantData?.mix_item_cat) return c;
			})[0];

			setMixedCategory(_mixedCategory);
		});
	}, [restaurantData]);

	return (
		<div className="page page-restaurant">
			<div className="left">
				<section className="page-restaurant-section-general">
					<header className="page-restaurant-section-header">
						<h2 className="page-restaurant-section-header-heading">
							Obecná nastavení
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
									<td>
										<section>
											<span>Hotovost</span>
											<TrueFalseIcon
												val={
													restaurantData?.pymt[0]
												}
											/>
										</section>
										<section>
											<span>Karta</span>
											<TrueFalseIcon
												val={
													restaurantData?.pymt[1]
												}
											/>
										</section>
										<section>
											<span>Stravenky</span>
											<TrueFalseIcon
												val={
													restaurantData?.pymt[2]
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
										Upozornění na nové objednávky emailem
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
										Zapnuto pro <b>{mixedCategory?.name}</b>
									</td>
								</tr>
								<tr>
									<td>Poznámka - hlavička stránky</td>
									<td>{}</td>
								</tr>
								<tr>
									<td>Poznámka - potvrzení objednávky</td>
									<td>{}</td>
								</tr>
								<tr>
									<td>Facebook</td>
									<td>{}</td>
								</tr>
								<tr>
									<td>Instagram</td>
									<td>{}</td>
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
										<FontAwesomeIcon icon={faCalendarDay} />
										Den
									</th>
									<th>
										<FontAwesomeIcon icon={faDoorOpen} />
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
								<tr>
									<td>Pondělí</td>
									<td>
										<FontAwesomeIcon icon={faCheck} />
									</td>
									<td>00:00</td>
									<td>23:59</td>
								</tr>
								<tr>
									<td>Úterý</td>
									<td>
										<FontAwesomeIcon icon={faCheck} />
									</td>
									<td>00:00</td>
									<td>23:59</td>
								</tr>
								<tr>
									<td>Středa</td>
									<td>
										<FontAwesomeIcon icon={faCheck} />
									</td>
									<td>00:00</td>
									<td>23:59</td>
								</tr>
								<tr>
									<td>Čtvrtek</td>
									<td>
										<FontAwesomeIcon icon={faCheck} />
									</td>
									<td>00:00</td>
									<td>23:59</td>
								</tr>
								<tr>
									<td>Pátek</td>
									<td>
										<FontAwesomeIcon icon={faCheck} />
									</td>
									<td>00:00</td>
									<td>23:59</td>
								</tr>
								<tr>
									<td>Sobota</td>
									<td>
										<FontAwesomeIcon icon={faCheck} />
									</td>
									<td>00:00</td>
									<td>23:59</td>
								</tr>
								<tr>
									<td>Neděle</td>
									<td>
										<FontAwesomeIcon icon={faCheck} />
									</td>
									<td>00:00</td>
									<td>23:59</td>
								</tr>
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
		</div>
	);
};

export default Restaurant;
