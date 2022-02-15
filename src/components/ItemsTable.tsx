import { faCheck, faEdit, faGripVertical, faMinus, faTimes, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import TrueFalseIcon from "./TrueFalseIcon";
import ValueNullIcon from "./ValueNullIcon";

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
		<div className="table-container itemstable-container">
            <table className="table itemstable">
                <thead className="table-header itemstable-header">
                    <tr>
                        <th></th>
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
                        <th>Odstranit</th>
                    </tr>
                </thead>
                <tbody className="table-body itemstable-body">
                    {props.items.map((item: Item) => {
                        {
                            return (
                                <tr key={item.code}>
                                    <td>
                                        <FontAwesomeIcon icon={faGripVertical} />
                                    </td>
                                    <td>
                                        {item.code}
                                    </td>
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
                                        <ValueNullIcon
                                            val={
                                                item.amount
                                            }
                                        />
                                    </td>
                                    <td>
                                        <ValueNullIcon
                                            val={
                                                item.alergeny
                                            }
                                        />
                                    </td>
                                    <td>
										<TrueFalseIcon
											val={
												item.active
											}
										/>
                                    </td>
                                    <td>
										<TrueFalseIcon
											val={
												item.is_supplement
											}
										/>
                                    </td>
                                    <td>
										<TrueFalseIcon
											val={
												item.is_restricted
											}
										/>
                                    </td>
                                    <td>
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
        </div>
	);
};

export default ItemsTable
