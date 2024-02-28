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
    <>
      <ul>
        {product !== null &&
          product.image.map(i => {
            return (
              <li>
                <img src={i} />
              </li>
            )
          })
        }
      </ul>
    </>
  )
}