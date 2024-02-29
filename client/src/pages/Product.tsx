import { Link, useParams } from "react-router-dom"
import all_clothes from "../assets/json/shop/clothes.json"
import { useEffect, useState } from "react"
import { useCart } from "../hook/useCart"

type product = ProductInterface

export const Product = () => {

  const { id } = useParams()
  const { colorId } = useParams()
  const [product, setProduct] = useState<product | null>()

  useEffect(() => {
    const productAsigned = all_clothes.all.find(clothe => clothe.id.toString() === id && clothe.colorId.toString() === colorId)
    setProduct(productAsigned)
    console.log(productAsigned)
  })

  const { addToCart } = useCart()

  return (
    <section className="w-screen overflow-x-hidden">
      <header>
        <section className="flex overflow-scroll">
          {
            product?.images.map(image => {
              return (
                <img
                  className="w-screen h-1/3 object-cover"
                  src={image}
                />
              )
            })
          }
        </section>
      </header>
      <div className="p-6 -text--color-black ">
        <h1 className="text-xl">
          <strong>
            {product?.name}
          </strong>
          {product?.new && <span className="ml-4 -bg--color-very-light-grey rounded-2xl px-2 py-1 text-xs font-extrabold -text--color-black"> NEW </span>}
        </h1>
        <p className="my-1">
          {product?.category}
        </p>
        <p className="font-bold">
          ${product?.price}
        </p>
      </div>
      <section className="text-center">
        {
          all_clothes.all?.map(clothe => {
            if (clothe.id.toString() === id) {
              return (
                <Link to={`/product/${id}/${clothe.colorId}`}>
                  <article className="w-24 mx-4 inline-block">
                    <img src={clothe.images[0]} className={`border-2 ${clothe.colorId.toString() === colorId ? "-border--color-black" : "-border--color-very-light-grey"}`} />
                    <p className="-text--color-black font-semibold text-sm">
                      {clothe.colorName}
                    </p>
                  </article>
                </Link>
              )
            }
          })
        }
      </section>
      <button
        onClick={() => addToCart(product)}
        className="block m-auto -bg--color-black -text--color-light-grey-violet font-bold p-4 my-4 rounded-full w-11/12">
        ADD TO BAG
      </button>
    </section>
  )
}