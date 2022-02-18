import {
	faGripVertical,
	faMinus,
	faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import IProduct from "../interfaces/IProduct"
import TrueFalseIcon from "./TrueFalseIcon"
import ValueNullIcon from "./ValueNullIcon"
import { api } from "../config/api"
import useToken from "./useToken"
import { useRequireAuth } from "./auth/useRequireAuth"

const Product = (props: {
	product: IProduct
	callbackDeleteProduct: (id: number) => void
}) => {
	const { product, callbackDeleteProduct } = props
	const { token } = useToken()
	useRequireAuth()

	const deleteProduct = (id: number) => {
		api.delete(`/product/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			console.log(response)
			callbackDeleteProduct(id)
		})
	}

	return (
		<tr key={product.code}>
			<td>
				<FontAwesomeIcon icon={faGripVertical} />
			</td>
			<td>{product.code}</td>
			<td>
				{product.img_thumb !== "" ? (
					<img src={product.img_thumb}></img>
				) : (
					<FontAwesomeIcon icon={faMinus} />
				)}
			</td>
			<td>{product.name}</td>
			<td>{product.px}&nbsp;Kč</td>
			<td>{product.pkpx}&nbsp;Kč</td>
			<td>
				<ValueNullIcon val={product.amount} />
			</td>
			<td>
				<ValueNullIcon val={product.alergeny} />
			</td>
			<td>
				<TrueFalseIcon val={product.active} />
			</td>
			<td>
				<TrueFalseIcon val={product.is_supplement} />
			</td>
			<td>
				<TrueFalseIcon val={product.is_restricted} />
			</td>
			<td>
				<button
					className="button itemstable-body-button itemstable-body-button-delete"
					onClick={() => {
						if (
							window.confirm(
								`Chcete vymazat položku „${product.name}“? Tato akce je nevratná.`
							)
						)
							deleteProduct(product.id)
					}}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</td>
		</tr>
	)
}

export default Product
