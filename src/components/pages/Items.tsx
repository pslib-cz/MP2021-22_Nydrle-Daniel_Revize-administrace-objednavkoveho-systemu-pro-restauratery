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
			let _categories = Object.values(response.data.data) as ICategory[]
			_categories = _categories.sort(
				(a, b) => Number(a.order) - Number(b.order)
			)
			setCategories(_categories)
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
				order: categories[categories.length - 1].order + 1,
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

	const moveCategory = (category: ICategory, direction: string): void => {
		let _categories: ICategory[] = categories
		let movedCategoryIndex: number = _categories.indexOf(category)
		let movedCategoryOrder: number = category.order
		let swappedCategoryIndex: number = 0
		let swappedCategoryOrder: number
		swappedCategoryIndex =
			direction === "up" ? movedCategoryIndex - 1 : movedCategoryIndex + 1
		console.log(swappedCategoryIndex)
		let swappedCategory = _categories[swappedCategoryIndex]
		swappedCategoryOrder = swappedCategory.order
		category = { ...category, order: swappedCategoryOrder }
		swappedCategory = { ...swappedCategory, order: movedCategoryOrder }
		_categories[movedCategoryIndex] = swappedCategory
		_categories[swappedCategoryIndex] = category
		setCategories([..._categories])
		console.log(_categories)
		api.post(
			`/category/${category.id}`,
			{
				order: swappedCategoryOrder,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			console.log(response)
		})
		api.post(
			`/category/${swappedCategory.id}`,
			{
				order: movedCategoryOrder,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			console.log(response)
		})
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
									key={category.id}
									className="button"
									href={`#${category.name}`}>
									{category.name}
								</a>
							)
						})}

						<button
							className="button page-items-links-link button--add"
							onClick={() => addCategory()}>
							<FontAwesomeIcon icon={faPlus} />
							Přidat kategorii
						</button>
					</div>
					{categories.map((category: ICategory) => {
						return (
							<Category
								key={category.id}
								propCategory={category}
								propProducts={getFilteredProducts(category.id)}
								callbackDeleteCategory={(id: number): void =>
									deleteCategory(id)
								}
								callbackMoveCategory={(
									category: ICategory,
									direction: string
								): void => moveCategory(category, direction)}
								borderCategoriesOrders={{
									first: categories[0].order,
									last: categories[categories.length - 1]
										.order,
								}}
							/>
						)
					})}
				</>
			)}
		</div>
	)
}
