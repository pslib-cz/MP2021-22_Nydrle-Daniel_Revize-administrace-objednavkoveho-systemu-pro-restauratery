import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { api } from "../../config/api"
import { useRequireAuth } from "../auth/useRequireAuth"
import ICategory from "../../interfaces/ICategory"
import IProduct from "../../interfaces/IProduct"
import { useToken } from "../useToken"
import { Category } from "../Category"
import { Loader } from "../Loader"

export const Items = () => {
	document.title = "Sortiment"
	const [isLoading, setIsLoading] = useState(true)
	const [categories, setCategories] = useState<ICategory[]>([])
	const [products, setProducts] = useState(Array<any>())
	const { token } = useToken()
	useRequireAuth()

	const getCategories = () => {
		api.get("/category/all", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			setCategories(Object.values(response.data.data))
		})
	}

	const getProducts = () => {
		api.get("/product/all", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			setProducts(response.data.data)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		getCategories()
		getProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getFilteredProducts = (categoryId: number): IProduct[] => {
		return products.filter((i: IProduct) => {
			return i.cat === categoryId
		})
	}

	const addCategory = () => {
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
			setCategories([...categories, response.data.data])
		})
		getCategories()
	}

	const deleteCategory = (id: number) => {
		setCategories(categories.filter((c) => c.id !== id))
	}

	return (
		<div className="page page-items">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className="page-items-links">
						{categories.map((category: ICategory) => {
							return (
								<a
									className="button page-items-links-link"
									href={`#${category.name}`}>
									{category.name}
								</a>
							)
						})}

						<button
							className="button page-items-button--add-category"
							onClick={() => addCategory()}>
							<FontAwesomeIcon icon={faPlus} />
							Přidat kategorii
						</button>
					</div>
					{categories.map((category: ICategory) => {
						return (
							<Category
								propCategory={category}
								propProducts={getFilteredProducts(category.id)}
								callbackDeleteCategory={(id: number): void =>
									deleteCategory(id)
								}
							/>
						)
					})}
				</>
			)}
		</div>
	)
}
