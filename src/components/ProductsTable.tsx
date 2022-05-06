import { useEffect, useRef, useState } from "react"
import { api } from "../config/api"
import IProduct from "../interfaces/IProduct"
import { Product } from "./Product"
import { useToken } from "./auth/useToken"

export const ProductsTable = (props: {
	filteredProducts: IProduct[]
	callbackSetFilteredProducts: (products: IProduct[]) => void
}) => {
	const { filteredProducts, callbackSetFilteredProducts } = props
	const [products, setProducts] = useState<IProduct[]>([])
	const { token } = useToken()
	const ref = useRef(null)

	const deleteProduct = (id: number): void => {
		setProducts(products.filter((p) => p.id !== id))
		callbackSetFilteredProducts(products.filter((p) => p.id !== id))
	}

	useEffect(() => {
		setProducts(Object.values(filteredProducts))
	}, [filteredProducts])

	const changeOrder = (
		movedProduct: IProduct,
		swappedProduct: IProduct
	): void => {
		let _products = products
		movedProduct = _products.find(
			(item) => item.id === movedProduct.id
		) as IProduct
		swappedProduct = _products.find(
			(item) => item.id === swappedProduct.id
		) as IProduct
		let movedProductIndex: number = _products.indexOf(movedProduct)
		let swappedProductIndex: number = _products.indexOf(swappedProduct)
		movedProduct = { ...movedProduct, order: swappedProduct.order }
		swappedProduct = { ...swappedProduct, order: movedProduct.order }
		_products[swappedProductIndex] = movedProduct
		_products[movedProductIndex] = swappedProduct
		callbackSetFilteredProducts([..._products])
		setProducts(_products)
		api.post(
			`/product/${_products[swappedProductIndex].id}`,
			{ order: swappedProduct.order },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		api.post(
			`/product/${_products[movedProductIndex].id}`,
			{ order: movedProduct.order },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}

	return (
		<div className="table-container productstable-container">
			<table className="table productstable">
				<thead className="table-header productstable-header">
					<tr>
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
				<tbody className="table-body productstable-body" ref={ref}>
					{products.map((product: IProduct) => {
						return (
							<Product
								key={product.id}
								propProduct={product}
								callbackDeleteProduct={(id: number) =>
									deleteProduct(id)
								}
								callbackChangeOrder={(
									movedProduct: IProduct,
									swappedProduct: IProduct
								) => changeOrder(movedProduct, swappedProduct)}
							/>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
