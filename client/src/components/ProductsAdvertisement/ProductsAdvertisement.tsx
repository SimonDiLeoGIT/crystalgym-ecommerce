import { Link } from "react-router-dom"
import './ProductsAdvertisement.css'


type ProductList = ProductInterface[]

interface Props {
  products: ProductList
  title: string
}

export const ProductsAdvertisement: React.FC<Props> = ({ products, title }) => {



  return (
    <section className="p-2 mb-4 lg:w-11/12 lg:m-auto">
      <h1 className="font-bold text-xl p-2">{title}</h1>
      <section className="flex overflow-x-auto whitespace-nowrap">
        {products.map(product => {
          return (
            <Link to={`/product/${product.id}/${product.colorId}`}>
              <article className="min-w-72 mx-1" key={product.id}>
                <figure className="mb-4 h-96">
                  <img className="w-full h-5/6 object-cover" src={product.images[0]} alt={product.name} />
                  <figcaption className="mt-2">
                    <h1 className="text-lg font-bold text-nowrap overflow-x-hidden text-ellipsis">{product.name}</h1>
                    <p className="text-sm">{product.category}</p>
                    <p className="text-sm">${product.price}</p>
                  </figcaption>
                </figure>
              </article>
            </Link>
          )
        })}
      </section>
    </section>
  )
}