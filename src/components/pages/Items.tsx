import { faPencilAlt, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { api } from "../../config/api"
import { useRequireAuth } from "../auth/useRequireAuth"
import ICategory from "../../interfaces/ICategory"
import IProduct from "../../interfaces/IProduct"
import useToken from "../useToken"
import ProductsTable from "../ProductsTable"
import Category from "../Category"

const Items = () => {
	document.title = "Sortiment"
	const [categories, setCategories] = useState<ICategory[]>([])
	const [products, setProducts] = useState(Array<any>())
	const { token } = useToken()
	useRequireAuth()

	useEffect(() => {
		getCategories()
		getProducts()
	}, [])

	let getCategories = () => {
		api.get("/category/all", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log(response.data.data)
				setCategories(Object.values(response.data.data))
			})
			.catch((error) => {
				console.log(error)
			})
	}

	let getProducts = () => {
		api.get("/product/all", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				setProducts(response.data.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	let getFilteredProducts = (categoryId: number): IProduct[] => {
		return products.filter((i: IProduct) => {
			return i.cat === categoryId
		})
	}

	let addCategory = () => {
		api.post(
			"/category",
			{
				name: "new",
				has_images: true,
				active: true,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			console.log(response)
			setCategories([...categories, response.data.data])
		})
		getCategories()
	}

	let deleteCategory = (id: number) => {
		setCategories(categories.filter(c => c.id !== id))
	}

	return (
		<div className="page page-items">
			<div className="page-items-links">
				{categories.map((category: ICategory) => {
					{
						return (
							<a
								className="button page-items-links-link"
								href={`#${category.name}`}>
								{category.name}
							</a>
						)
					}
				})}
			</div>
			{categories.map((category: ICategory) => {
				{
					return (
						<Category
							category={category}
							propProducts={getFilteredProducts(category.id)}
							callbackDeleteCategory={(id: number): void =>
								deleteCategory(id)
							}
						/>
					)
				}
			})}
			<button
				className="button page-items-add-category-button"
				onClick={() => addCategory()}>
				<FontAwesomeIcon icon={"plus"} />
				Přidat kategorii
			</button>
		</div>
	)
}

export default Items
