import {
	faGripVertical,
	faMinus,
	faPencilAlt,
	faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import IProduct from "../interfaces/IProduct"
import TrueFalseIcon from "./TrueFalseIcon"
import ValueNullIcon from "./ValueNullIcon"
import { api } from "../config/api"
import useToken from "./useToken"
import { useRequireAuth } from "./auth/useRequireAuth"

const Product = (props: {
	propProduct: IProduct
	callbackDeleteProduct: (id: number) => void
}) => {
	const { propProduct, callbackDeleteProduct } = props
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const [product, setProduct] = useState<IProduct>({ ...propProduct })
	const { token } = useToken()
	useRequireAuth()

	useEffect(() => {
		setIsLoading(true)
		setProduct({ ...propProduct })
		setIsLoading(false)
	}, [])

	const deleteProduct = (id: number) => {
		api.delete(`/product/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			callbackDeleteProduct(id)
		})
	}

	const editProduct = (
		id: number,
		code: string,
		name: string,
		px: number,
		pkpx: number,
		amount: string | null,
		alergeny: string | null,
		active: boolean,
		is_supplement: boolean,
		is_restricted: boolean
	) => {
		setIsLoading(true)
		if (amount === "") amount = null
		if (alergeny === "") alergeny = null
		api.post(
			`/product/${id}`,
			{
				code,
				name,
				px,
				pkpx,
				amount,
				alergeny,
				active,
				is_supplement,
				is_restricted,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			setIsEdited(false)
		})
		setIsLoading(false)
	}

	return (
		<>
			{!isEdited && (
				<tr>
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
							className="button itemstable-body-button itemstable-body-button--edit-product"
							onClick={() => {
								setIsEdited(true)
							}}>
							<FontAwesomeIcon icon={faPencilAlt} />
						</button>
						<button
							className="button itemstable-body-button itemstable-body-button--delete-product"
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
			)}
			{isEdited && (
				<tr className="table-body-row--is-edited">
					<td>
						<FontAwesomeIcon icon={faGripVertical} />
					</td>
					<td>
						<input
							type="text"
							value={product.code}
							onChange={(e) =>
								setProduct({ ...product, code: e.target.value })
							}
						/>
					</td>
					<td>
						{product.img_thumb !== "" ? (
							<img src={product.img_thumb}></img>
						) : (
							<FontAwesomeIcon icon={faMinus} />
						)}
					</td>
					<td>
						<input
							type="text"
							value={product.name}
							onChange={(e) =>
								setProduct({ ...product, name: e.target.value })
							}
						/>
					</td>
					<td>
						<input
							type="number"
							value={product.px}
							onChange={(e) =>
								setProduct({
									...product,
									px: e.target.valueAsNumber,
								})
							}
						/>
					</td>
					<td>
						<input
							type="number"
							value={product.pkpx}
							onChange={(e) =>
								setProduct({
									...product,
									pkpx: e.target.valueAsNumber,
								})
							}
						/>
					</td>
					<td>
						<input
							type="text"
							value={product.amount}
							onChange={(e) =>
								setProduct({
									...product,
									amount: e.target.value,
								})
							}
						/>
					</td>
					<td>
						<input
							type="text"
							value={product.alergeny}
							onChange={(e) =>
								setProduct({
									...product,
									alergeny: e.target.value,
								})
							}
						/>
					</td>
					<td>
						<input
							type="checkbox"
							checked={!!product.active}
							onChange={(e) => {
								setProduct({
									...product,
									active: +e.target.checked,
								})
							}}
						/>
					</td>
					<td>
						<input
							type="checkbox"
							checked={!!product.is_supplement}
							onChange={(e) => {
								setProduct({
									...product,
									is_supplement: +e.target.checked,
								})
							}}
						/>
					</td>
					<td>
						<input
							type="checkbox"
							checked={!!product.is_restricted}
							onChange={(e) => {
								setProduct({
									...product,
									is_restricted: +e.target.checked,
								})
							}}
						/>
					</td>
					<td>
						<button
							className="button itemstable-body-button itemstable-body-button--save-product"
							onClick={() => {
								editProduct(
									product.id,
									product.code,
									product.name,
									product.px,
									product.pkpx,
									product.amount,
									product.alergeny,
									!!product.active,
									!!product.is_supplement,
									!!product.is_restricted
								)
							}}>
							Uložit
							<FontAwesomeIcon icon={faPencilAlt} />
						</button>
					</td>
				</tr>
			)}
		</>
	)
}

export default Product
