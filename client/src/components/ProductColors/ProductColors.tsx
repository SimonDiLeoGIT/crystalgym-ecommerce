import { Link, useParams } from "react-router-dom"
import all_clothes from "../../assets/json/shop/clothes.json"
import { ImageLoad } from "../ImageLoad/ImageLoad"

export const ProductColors = () => {

  const { id } = useParams()
  const { colorId } = useParams()

  return (
    <section className="text-center">
      {
        all_clothes.all?.map(clothe => {
          if (clothe.id.toString() === id) {
            return (
              <Link to={`/product/${id}/${clothe.colorId}`}>
                <article className="w-24 mx-4 inline-block">
                  <ImageLoad
                    imageUrl={clothe.images[0]}
                    imageBlurHash={clothe.hashcode}
                    alt={clothe.name}
                    imageStyles={`border-2 ${clothe.colorId.toString() === colorId ? "-border--color-black" : "-border--color-very-light-grey"}`}
                  />
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
  )
}