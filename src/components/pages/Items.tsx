import { useEffect, useState } from 'react'
import { api } from '../../config/api'
import { useRequireAuth } from '../auth/useRequireAuth'
import ItemsTable from '../ItemsTable'
import useToken from '../useToken'

interface Category {
	id: number
	name: string
	order: number
	desc: string
	active: number
	has_images: number
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
				setCategories(response.data.data)
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
				console.log(response.data.data)
				setItems(response.data.data)
			})
			.catch(error => {
				console.log(error)
			})
	}, []);
    return (
        <div className='page page-items'>
            <h1>Položky</h1>
			{categories.map((category: Category) => {
				{return (
					<a className='item-link' href={`#${category.name}`}>{category.name}</a>
				)}
			})}
			{categories.map((category: Category) => {
				{return (
					<section key={category.id} id={category.name} className='category'>
						<h2>{category.name}</h2>
						<ItemsTable items={filteredItems(category.id)} />
					</section>
				)}
			})}
        </div>
    );
};

export default Items
