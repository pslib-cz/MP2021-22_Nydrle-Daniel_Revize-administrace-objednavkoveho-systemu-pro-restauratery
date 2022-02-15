import { faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { api } from '../../config/api'
import { useRequireAuth } from '../auth/useRequireAuth'
import Category from '../../interfaces/Category'
import Item from '../../interfaces/Item'
import ItemsTable from '../ItemsTable'
import useToken from '../useToken'

const Items = () => {
	document.title = "Sortiment"
	const [categories, setCategories] = useState<Category[]>([])
	const [items, setItems] = useState(Array<any>())
    const {token} = useToken()
    useRequireAuth()

	let filteredItems = (categoryId: number) => {
		return items.filter((i: Item) => {
			return i.cat === categoryId
		})
	}
    
	useEffect(() => {
		api.get("/category/all", {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
			.then(response => {
				setCategories(Object.values(response.data.data))
			})
			.catch(error => {
				console.log(error)
			})
		api.get("/product/all", {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
			.then(response => {
				setItems(response.data.data)
			})
			.catch(error => {
				console.log(error)
			})
	}, []);
    return (
        <div className='page page-items'>
			<div className="page-items-links">
			{categories.map((category: Category) => {
				{return (
					<a className='page-items-links-link' href={`#${category.name}`}>{category.name}</a>
				)}
			})}
			</div>
			{categories.map((category: Category) => {
				{return (
					<section key={category.id} id={category.name} className='page-items-category'>
						<header className="page-items-category-header">
							<h2 className='page-items-category-header-heading'>{category.name}</h2>
							<button className="page-items-category-header-edit-button">
								<FontAwesomeIcon icon={faPencilAlt} />
								Upravit kategorii
							</button>
							<button className="page-items-category-header-delete-button">
								<FontAwesomeIcon icon={faTrash} />
								Odstranit kategorii 
							</button>
							<button className="page-items-category-header-add-button">
								<FontAwesomeIcon icon={faPlus} />
								Přidat novou položku
							</button>
						</header>
						<ItemsTable items={filteredItems(category.id)} />
					</section>
				)}
			})}
        </div>
    );
};

export default Items
