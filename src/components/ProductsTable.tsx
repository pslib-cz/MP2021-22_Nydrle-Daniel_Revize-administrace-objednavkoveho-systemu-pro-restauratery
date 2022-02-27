import { useEffect, useState } from "react"
import IProduct from "../interfaces/IProduct"
import { Product } from "./Product"

export const ProductsTable = (props: {
	filteredProducts: IProduct[]
	callbackSetFilteredProducts: (products: IProduct[]) => void
}) => {
	const { filteredProducts, callbackSetFilteredProducts } = props
	const [products, setProducts] = useState<IProduct[]>([])

	const deleteProduct = (id: number): void => {
		setProducts(products.filter((p) => p.id !== id))
		callbackSetFilteredProducts(products.filter((p) => p.id !== id))
	}

	useEffect(() => {
		setProducts(Object.values(filteredProducts))
	}, [filteredProducts])

	return (
		<div className="table-container productstable-container">
			<table className="table productstable">
				<thead className="table-header productstable-header">
					<tr>
						<th className="grip"></th>
						<th className="code">Kód</th>
						<th className="img">Foto</th>
						<th className="name">Název</th>
						<th className="px">Cena</th>
						<th className="pkpx">Obal</th>
						<th className="amount">Ks/Kg/l</th>
						<th className="alergeny">Alergeny</th>
						<th className="active">Aktivní</th>
						<th className="is_supplement">Rozvoz</th>
						<th className="is_restricted">18+</th>
						<th className="buttons">Interakce</th>
					</tr>
				</thead>
				<tbody className="table-body productstable-body">
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
