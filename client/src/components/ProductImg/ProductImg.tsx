import { lazy } from "react";
import { Link } from "react-router-dom";
import add_to_bag_icon from "../../assets/icons/nav icons/bag-plus-1122-svgrepo-com.svg"
import like_icon from "../../assets/icons/like-icon.svg"
import { useCart } from "../../hook/useCart";
import { ProductInterface } from "../../interfaces/ProductInterfaces";

const ImageLoad = lazy(() => import("../ImageLoad/ImageLoad"))

type productType = ProductInterface

interface Props {
  product: productType
}

export const ProductImg: React.FC<Props> = ({ product }) => {

  const { addToCart } = useCart()


  function addProduct(product: productType) {
    addToCart(product)
  }

  return (
    <figure className="">
      <div className="relative overflow-hidden w-full h-72 lg:h-96">
        <Link to={`/product/${product.id}/${product.colorId}`} className="h-full w-full block">
          <ImageLoad
            imageUrl={product.images[0]}
            imageBlurHash={product.hashcode}
            alt={product.name}
            imageStyles="h-full w-full object-cover duration-500 hover:scale-110"
            loading="lazy"
          />
        </Link>
        <button onClick={() => addProduct(product)} className="absolute top-2 right-2 -bg--color-white rounded-full p-2 duration-150 hover:bg-opacity-60 hover:scale-105 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-white"> <img src={add_to_bag_icon} alt="bag icon" className="w-4" />  </button>
        <button className="absolute bottom-2 right-2 -bg--color-white rounded-full p-2 duration-150 hover:bg-opacity-60 hover:scale-105 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-white"> <img src={like_icon} alt="like icon" className="w-4" /> </button>
        {product.new &&
          <span className="absolute bottom-2 left-2 -bg--color-white rounded-2xl px-2 py-1 text-sm font-bold -text--color-black">
            New
          </span>
        }
      </div>
      <figcaption className="p-4 text-sm -text--color-black md:text-base">
        <h1 className="font-semibold text-nowrap overflow-x-hidden text-ellipsis md:font-bold ">{product.name}</h1>
        <p className="">{product.category}</p>
        <p className="">${product.price}</p>
      </figcaption>
    </figure>
  )
}