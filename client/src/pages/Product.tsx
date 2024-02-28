import { useParams } from "react-router-dom"
import all_clothes from "../assets/json/shop/clothes.json"
import { useEffect, useState } from "react"

type product = ProductInterface

export const Product = () => {

  const { id } = useParams()
  const [product, setProduct] = useState<product | null>(null)

  useEffect(() => {
    console.log(id)
    const productAsigned = all_clothes.all.find(clothe => clothe.id === id)
    console.log(productAsigned)
    setProduct(productAsigned)
  })

  return (
    <section className="w-screen overflow-x-hidden">
      <header>
        <section className="flex overflow-scroll">
          {
            product?.image[0].src.map(i => {
              return (
                <img
                  className="w-screen h-1/3 object-cover"
                  src={i}
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
      <section>
        {
          product?.image.map(i => {
            return (
              <article>
                <img src={i.src[0]} />
                <p>
                  {i.color}
                </p>
              </article>
            )
          })
        }
      </section>
      <button className="block m-auto -bg--color-black -text--color-light-grey-violet font-bold p-4 rounded-full w-11/12">
        ADD TO BAG
      </button>
    </section>
  )
}