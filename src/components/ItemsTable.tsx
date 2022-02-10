import { faCheck, faEdit, faMinus, faTimes, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

interface Props {
	items: Item[]
}

interface Item {
	id: number
	code: string
	cat: number
	name: string
	alergeny: string
	px: number
	amount: string
	img_full: string
	img_thumb: string
	active: number
	pkpx: number
	is_supplement: number
	stock: number
	is_restricted: number
	desc: string
	ingreds: string
	ingreds_count: number
}

const ItemsTable = (props: Props) => {
	return (
		<table className="table itemstable">
			<thead className="table-header itemstable-header">
				<tr>
					<th>Kód</th>
                    <th>Foto</th>
                    <th>Název</th>
                    <th>Cena</th>
                    <th>Obal</th>
                    <th>Ks/Kg/l</th>
                    <th>Alergeny</th>
                    <th>Aktivní</th>
                    <th>Rozvoz</th>
                    <th>18+</th>
                    <th>Upravit</th>
				</tr>
			</thead>
			<tbody className="table-body itemstable-body">
				{props.items.map((item: Item) => {
					{
                        console.log(item.alergeny === "");
						return (
							<tr key={item.code}>
								<td>{item.code}</td>
                                <td>
                                    {item.img_thumb !== ""
                                    ? <img src={item.img_thumb}></img>
                                    : <FontAwesomeIcon icon={faMinus} />
                                    }
                                </td>
                                <td>{item.name}</td>
								<td>{item.px}&nbsp;Kč</td>
                                <td>{item.pkpx}&nbsp;Kč</td>
                                <td>
                                    {item.amount !== ""
                                    ? item.amount
                                    : <FontAwesomeIcon icon={faMinus} />
                                    }
                                </td>
                                <td>
                                    {item.alergeny !== ""
                                    ? item.alergeny
                                    : <FontAwesomeIcon icon={faMinus} />
                                }
                                </td>
                                <td>
                                    {item.active
                                    ? <FontAwesomeIcon icon={faCheck} />
                                    : <FontAwesomeIcon icon={faTimes} />
                                    }
                                </td>
                                <td>
                                    {item.is_supplement
                                    ? <FontAwesomeIcon icon={faTimes} />
                                    : <FontAwesomeIcon icon={faCheck} />}
                                </td>
                                <td>
                                    {item.is_restricted
                                    ? <FontAwesomeIcon icon={faCheck} />
                                    : <FontAwesomeIcon icon={faTimes} />}
                                </td>
                                <td>
                                    <button className="button itemstable-body-button itemstable-body-button-edit">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="button itemstable-body-button itemstable-body-button-delete">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
							</tr>
						);
					}
				})}
			</tbody>
		</table>
	);
};

export default ItemsTable
