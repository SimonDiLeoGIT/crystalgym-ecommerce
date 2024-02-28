
import add_to_bag_icon from "../../assets/icons/nav icons/bag-plus-1122-svgrepo-com.svg"
import like_icon from "../../assets/icons/like-icon.svg"
import { useCart } from "../../hook/useCart";
import { Link } from "react-router-dom";

type clotheList = ProductInterface[];

interface Props {
  clothes: clotheList
}

export const Products: React.FC<Props> = ({ clothes }) => {

  const { addToCart } = useCart()

  return (
    <section className="grid grid-cols-2 gap-2">
      {clothes.map((clothe) => {
        return (
          <article className="shadow-md" key={clothe.id}>
            <figure>
              <image className=" relative">
                <Link to={`/product/${clothe.id}`}>
                  <img className="w-full max-h-48 object-cover" src={clothe.image[0].src[0]} alt={clothe.name} />
                </Link>
                <button onClick={() => addToCart(clothe)} className="absolute top-2 right-2 -bg--color-white rounded-full p-2"> <img src={add_to_bag_icon} alt="bag icon" className="w-4" />  </button>
                <button className="absolute bottom-2 right-2 -bg--color-white rounded-full p-2"> <img src={like_icon} alt="like icon" className="w-4" /> </button>
                {clothe.new &&
                  <span className="absolute bottom-2 left-2 -bg--color-white rounded-2xl px-2 py-1 text-sm font-bold -text--color-black">
                    New
                  </span>
                }
              </image>
              <figcaption className="mt-1">
                <h1 className="text-sm font-semibold text-nowrap overflow-x-hidden text-ellipsis">{clothe.name}</h1>
                <p className="text-sm">{clothe.category}</p>
                <p className="text-sm">${clothe.price}</p>
              </figcaption>
            </figure>
          </article>
        )
      }
      )}
    </section>
  )
}