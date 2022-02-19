import {
	faCheck,
	faEdit,
	faGripVertical,
	faMinus,
	faTimes,
	faTrash,
	faTrashAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { api } from "../config/api"
import IProduct from "../interfaces/IProduct"
import Product from "./Product"
import TrueFalseIcon from "./TrueFalseIcon"
import useToken from "./useToken"
import ValueNullIcon from "./ValueNullIcon"

const ProductsTable = (props: {
	filteredProducts: IProduct[]
	callbackSetFilteredProducts: (products: IProduct[]) => void
}) => {
	const { filteredProducts, callbackSetFilteredProducts } = props
	const [products, setProducts] = useState<IProduct[]>([])
	const { token } = useToken()

	const deleteProduct = (id: number): void => {
		setProducts(products.filter((p) => p.id !== id))
		callbackSetFilteredProducts(products.filter((p) => p.id !== id))
	}

	useEffect(() => {
		setProducts(Object.values(filteredProducts))
	}, [filteredProducts])

	return (
		<div className="table-container itemstable-container">
			<table className="table itemstable">
				<thead className="table-header itemstable-header">
					<tr>
						<th></th>
						<th>Kód</th>
						<th>Foto</th>
						<th>Název</th>
						<th>Cena</th>
						<th>Obal</th>
						<th>Ks/Kg/l</th>
						<th>Alergeny</th>
						<th>Aktivní</th>
						<th>Rozvoz</th>
						<th>18+</th>
						<th>Interakce</th>
					</tr>
				</thead>
				<tbody className="table-body itemstable-body">
					{products.map((product: IProduct) => {
						return (
							<Product
								key={product.id}
								propProduct={product}
								callbackDeleteProduct={(id: number) =>
									deleteProduct(id)
								}
							/>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default ProductsTable
