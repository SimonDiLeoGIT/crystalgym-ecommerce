import { useCart } from "../../hook/useCart"
import bag_icon from "../../assets/icons/nav icons/bag-shopping.svg"
import trash_icon from "../../assets/icons/nav icons/trash-slash-alt-svgrepo-com.svg"
import './Cart.css'

export const CartItems = () => {

  const { cart, addToCart, removeFromCart, clearFromCart } = useCart()

  return (
    <ul className="overflow-y-scroll w-screen mb-44 md:w-[32rem]">
      {
        cart.length === 0 &&
        <section className="w-full grid place-content-center absolute top-1/3">
          <img src={bag_icon} alt="Bag icon" className="w-40 m-auto" />
          <h2 className="text-xl font-semibold opacity-60"> Your Bag is Empty! :( </h2>
        </section>
      }
      {cart.map(item => {
        return (
          <li className="w-11/12 grid grid-cols-3 p-4 m-auto gap-2 border-b -border--color-very-light-grey">
            {
              <img className="w-20 row-span-2" src={item.product.images[0]} alt={item.product.name} />
            }
            <section className="col-span-2 relative">
              <p className="w-3/4"><strong> {item.product.name} </strong></p>
              <button onClick={() => clearFromCart(item.product)} className="absolute top-0 right-0 w-10 h-10 flex items-center duration-150 hover:bg-opacity-50 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-very-light-grey rounded-full">
                <img src={trash_icon} className="w-6 m-auto" />
              </button>
              <p>{item.product.category}</p>
              <p className="font-bold"> ${item.product.price} </p>
              <p className=""> <strong> Total </strong> - ${item.product.price * item.quantity} </p>
            </section>
            <footer className="m-auto ml-0 font-semibold text-lg col-span-2 grid grid-cols-3 w-32 rounded-lg overflow-hidden">
              <button onClick={() => removeFromCart(item.product)} className="-bg--color-light-grey-violet hover:opacity-80"> - </button>
              <small className="m-aut w-full py-2 text-center">
                {item.quantity}
              </small>
              <button onClick={() => addToCart(item.product)} className="-bg--color-light-grey-violet hover:opacity-80"> + </button>
            </footer>
          </li>
        )
      })}
    </ul>
  )
}