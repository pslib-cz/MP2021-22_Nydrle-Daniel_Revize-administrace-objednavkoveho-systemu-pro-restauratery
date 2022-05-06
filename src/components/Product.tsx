import {
	faMinus,
	faPencilAlt,
	faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import IProduct from "../interfaces/IProduct"
import { TrueFalseIcon } from "./TrueFalseIcon"
import { ValueNullIcon } from "./ValueNullIcon"
import { api } from "../config/api"
import { useToken } from "./auth/useToken"
import { useRequireAuth } from "./auth/useRequireAuth"
import { useDrag, useDrop } from "react-dnd"
import Uploady, { useUploady } from "@rpldy/uploady"
import UploadButton from "@rpldy/upload-button"

export const Product = (props: {
	propProduct: IProduct
	callbackDeleteProduct: (id: number) => void
	callbackChangeOrder: (
		movedProduct: IProduct,
		swappedProduct: IProduct
	) => void
}) => {
	const { propProduct, callbackDeleteProduct, callbackChangeOrder } = props
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const [product, setProduct] = useState<IProduct>({ ...propProduct })
	// const uploady = useUploady()
	const { token } = useToken()
	const ref = useRef(null)
	useRequireAuth()

	useEffect(() => {
		setProduct({ ...propProduct })
	}, [propProduct])

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
	}

	const moveProduct = (movedProduct: IProduct, swappedProduct: IProduct) => {
		callbackChangeOrder(movedProduct, swappedProduct)
	}

	const [{ isDragging }, drag] = useDrag(() => ({
		type: "products",
		item: { type: "products", order: product.order, content: product },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}))

	drag(ref)

	const [, drop] = useDrop(() => ({
		accept: "products",
		drop: (item: { content: IProduct }, monitor) =>
			moveProduct(item.content, product),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}))

	drop(ref)

	return (
		<>
			{!isEdited && (
				<tr
					className={`product ${
						isDragging ? "product--is-dragging" : ""
					}`}
					ref={ref}>
					<td className="code">{product.code}</td>
					<td className="img">
						{product.img_thumb !== "" ? (
							<img
								src={product.img_thumb}
								alt={product.name}></img>
						) : (
							<FontAwesomeIcon icon={faMinus} />
						)}
					</td>
					<td className="name">{product.name}</td>
					<td className="px">{product.px}&nbsp;Kč</td>
					<td className="pkpx">{product.pkpx}&nbsp;Kč</td>
					<td className="amount">
						<ValueNullIcon val={product.amount} />
					</td>
					<td className="alergeny">
						<ValueNullIcon val={product.alergeny} />
					</td>
					<td className="active">
						<TrueFalseIcon val={product.active} />
					</td>
					<td className="is_supplement">
						<TrueFalseIcon val={product.is_supplement} />
					</td>
					<td className="is_restricted">
						<TrueFalseIcon val={product.is_restricted} />
					</td>
					<td className="buttons">
						<button
							className="button productstable-body-button productstable-body-button--edit-product"
							onClick={() => {
								setIsEdited(true)
							}}>
							<FontAwesomeIcon icon={faPencilAlt} />
						</button>
						<button
							className="button productstable-body-button productstable-body-button--delete-product"
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
				<tr className="product product--is-edited">
					<td className="code">
						<input
							type="text"
							value={product.code}
							onChange={(e) =>
								setProduct({ ...product, code: e.target.value })
							}
						/>
					</td>
					<td className="img">
						{/* <Uploady
							destination={{
								url: `/data/product/${product.id}/image`,
							}}
							accept="image/*">
							<UploadButton>Upload</UploadButton>
						</Uploady> */}
					</td>
					<td className="name">
						<input
							type="text"
							value={product.name}
							onChange={(e) =>
								setProduct({ ...product, name: e.target.value })
							}
						/>
					</td>
					<td className="px">
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
					<td className="pkpx">
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
					<td className="amount">
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
					<td className="alergeny">
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
					<td className="active">
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
					<td className="is_supplement">
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
					<td className="is_restricted">
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
					<td className="buttons">
						<button
							className="button productstable-body-button productstable-body-button--save-product"
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
