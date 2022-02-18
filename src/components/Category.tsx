import { faPencilAlt, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { api } from "../config/api"
import ICategory from "../interfaces/ICategory"
import IProduct from "../interfaces/IProduct"
import { useRequireAuth } from "./auth/useRequireAuth"
import ProductsTable from "./ProductsTable"
import useToken from "./useToken"

const Category = (props: {
	category: ICategory
	propProducts: IProduct[]
	callbackDeleteCategory: (id: number) => void
}) => {
	const { category, propProducts, callbackDeleteCategory } = props
	const [products, setProducts] = useState<IProduct[]>([])
	const { token } = useToken()
	useRequireAuth()

	useEffect(() => {
		setProducts(propProducts)
		console.log(propProducts.length);
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

	const addItem = (categoryId: number) => {
		api.post(
			"/product",
			{
				name: "novyi",
				amount: 5,
				active: false,
				px: 101,
				cat: categoryId,
				order: (products.length !== 0 ? products[products.length - 1].order + 1 : 1),
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

	return (
		<section
			key={category.id}
			id={category.name}
			className="page-items-category">
			<header className="page-items-category-header">
				<h2 className="page-items-category-header-heading">
					{category.name}
				</h2>
				<button className="button page-items-category-header-edit-category-button">
					<FontAwesomeIcon icon={"pencil-alt"} />
					Upravit kategorii
				</button>
				<button
					className="button page-items-category-header-delete-category-button"
					onClick={() => {
						if (
							window.confirm(
								`Chcete vymazat kategorii „${category.name}“? Tato akce je nevratná.`
							)
						)
							deleteCategory(category.id)
					}}>
					<FontAwesomeIcon icon={"trash"} />
					Odstranit kategorii
				</button>
				<button
					className="button page-items-category-header-add-item-button"
					onClick={() => addItem(category.id)}>
					<FontAwesomeIcon icon={"plus"} />
					Přidat novou položku
				</button>
			</header>
			<ProductsTable {...products} />
		</section>
	)
}

export default Category
