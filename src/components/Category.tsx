import {
	faCheck,
	faPencilAlt,
	faPlus,
	faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { api } from "../config/api"
import ICategory from "../interfaces/ICategory"
import IProduct from "../interfaces/IProduct"
import { useRequireAuth } from "./auth/useRequireAuth"
import ProductsTable from "./ProductsTable"
import useToken from "./useToken"

const Category = (props: {
	propCategory: ICategory
	propProducts: IProduct[]
	callbackDeleteCategory: (id: number) => void
}) => {
	let { propCategory, propProducts, callbackDeleteCategory } = props
	const [products, setProducts] = useState<IProduct[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const [category, setCategory] = useState<ICategory>({ ...propCategory })
	const { token } = useToken()
	useRequireAuth()

	useEffect(() => {
		setIsLoading(true)
		setProducts(propProducts)
		setCategory(propCategory)
		setIsLoading(false)
	}, [props])

	const deleteCategory = (id: number): void => {
		api.delete(`/category/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			callbackDeleteCategory(id)
		})
	}

	const editCategory = (
		id: number,
		name: string,
		has_images: boolean,
		desc: string
	) => {
		setIsLoading(true)
		api.post(
			`/category/${id}`,
			{
				name,
				has_images,
				desc,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			console.log(response)
			setIsEdited(false)
		})
		setIsLoading(false)
	}

	const addItem = (categoryId: number) => {
		api.post(
			"/product",
			{
				name: "nová položka",
				amount: "",
				active: false,
				px: 0,
				cat: categoryId,
				order:
					products.length !== 0
						? products[products.length - 1].order + 1
						: 1,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			setProducts([...products, response.data.data])
		})
	}

	const setCategoryProducts = (products: IProduct[]) => {
		setProducts(products)
	}

	return (
		<section key={category.id} id={category.name} className="category">
			{!isEdited && (
				<header className="category-header">
					<h2 className="category-header-heading">{category.name}</h2>
					<button
						className="button category-header-button--edit-category"
						onClick={() => setIsEdited(true)}>
						<FontAwesomeIcon icon={faPencilAlt} />
						Upravit kategorii
					</button>
					{products.length === 0 && (
						<button
							className="button category-header-button--delete-category"
							onClick={() => {
								if (
									window.confirm(
										`Chcete vymazat kategorii „${category.name}“? Tato akce je nevratná.`
									)
								)
									deleteCategory(category.id)
							}}>
							<FontAwesomeIcon icon={faTrash} />
							Odstranit kategorii
						</button>
					)}
					<button
						className="button category-header-button--add-item"
						onClick={() => addItem(category.id)}>
						<FontAwesomeIcon icon={faPlus} />
						Přidat novou položku
					</button>
					{category.desc !== "" && (
						<p>{category.desc}</p>
					)}
				</header>
			)}
			{isEdited && (
				<header className="category-header category-header--is-edited table-container">
					<table className="table">
						<thead className="table-header">
							<tr>
								<th className="name">Název</th>
								<th className="description">Popis</th>
								<th className="has_images">Zobrazovat obrázky</th>
								<th className="save">Uložit</th>
							</tr>
						</thead>
						<tbody className="table-body">
							<tr>
								<td className="name">
									<input
										type="text"
										value={category.name}
										onChange={(e) => {
											setCategory({
												...category,
												name: e.target.value,
											})
										}}
									/>
								</td>
								<td className="description">
									<input
										type="text"
										value={category.desc}
										onChange={(e) => {
											setCategory({
												...category,
												desc: e.target.value,
											})
										}}
									/>
								</td>
								<td className="has_images">
									<input
										type="checkbox"
										checked={!!category.has_images}
										onChange={(e) => {
											setCategory({
												...category,
												has_images: +e.target.checked,
											})
										}}
									/>
								</td>
								<td className="save">
									<button
										className="button category-header-button--save-category"
										onClick={() =>
											editCategory(
												category.id,
												category.name,
												!!category.has_images,
												category.desc
											)
										}>
										<FontAwesomeIcon icon={faCheck} />
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</header>
			)}
			<ProductsTable
				filteredProducts={products}
				callbackSetFilteredProducts={(products: IProduct[]) =>
					setCategoryProducts(products)
				}
			/>
		</section>
	)
}

export default Category
