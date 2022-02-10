import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useRequireAuth } from '../auth/useRequireAuth'

const Restaurant = () => {
	document.title = "Provozovna"
	useRequireAuth()

	return (
		<div className="page page-restaurant">
			<section className="page-restaurant-section">
				<header className="page-restaurant-section-header">
				</header>
				<table className='table'>
					<thead className='table-header'>
						<tr>
							<th colSpan={2}>Obecná nastavení</th>
						</tr>
					</thead>
					<tbody className='table-body'>
						<tr>
							<td>Zobrazovat kód jídla</td>
							<td><FontAwesomeIcon icon={faCheck} /></td>
						</tr>
						<tr>
							<td>Zobrazovat složení jídel</td>
							<td><FontAwesomeIcon icon={faTimes} /></td>
						</tr>
						<tr>
							<td>Upozornění na nové objednávky emailem</td>
							<td><FontAwesomeIcon icon={faCheck} /></td>
						</tr>
						<tr>
							<td>Posílat potvrzení objednávky zákazníkovi</td>
							<td><FontAwesomeIcon icon={faCheck} /></td>
						</tr>
						<tr>
							<td>Platební metody</td>
							<td></td>
						</tr>
						<tr>
							<td>Půlená pizza</td>
							<td></td>
						</tr>
						<tr>
							<td>Název provozovny</td>
							<td>Restaurace na Zkušební</td>
						</tr>
						<tr>
							<td>Adresa provozovny</td>
							<td>Zkušební náměstí 75/4, Praha 1</td>
						</tr>
						<tr>
							<td>Telefon</td>
							<td>+420 123 456 789</td>
						</tr>
						<tr>
							<td>Google Analytics kód</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</section>
			<section className="page-restaurant-section">
				<header className="page-restaurant-section-header">
					<h2 className="page-restaurant-section-header-heading">Možnosti</h2>
				</header>
				<table className='table'>
					<tbody>
						<tr>
							<td>Poznámka - hlavička stránky</td>
							<td></td>
						</tr>
						<tr>
							<td>Poznámka - potvrzení objednávky</td>
							<td></td>
						</tr>
						<tr>
							<td>Facebook</td>
							<td></td>
						</tr>
						<tr>
							<td>Instagram</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</section>
			<section className="page-restaurant-section">
				<header className="page-restaurant-section-header">
					<h2 className="page-restaurant-section-header-heading">Příjem objednávek</h2>
				</header>
				<table className='table'>
					<thead className='table-header'>
						<tr>
							<th>Den</th>
							<th>Otevřeno</th>
							<th>Začátek</th>
							<th>Konec</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Pondělí</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Úterý</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Středa</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Čtvrtek</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Pátek</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Sobota</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Neděle</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</section>
			<section className="page-restaurant-section">
				<header className="page-restaurant-section-header">
					<h2 className="page-restaurant-section-header-heading">Dovolená</h2>
				</header>
				<table className='table'>
					<thead>
						<td>Začátek</td>
						<td>Konec</td>
					</thead>
					<tbody>
					</tbody>
				</table>
			</section>
		</div>
	);
};

export default Restaurant