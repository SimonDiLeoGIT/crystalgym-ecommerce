import { useState } from "react"
import bag_icon from "../../assets/icons/nav icons/bag-shopping.svg"
import close_icon from "../../assets/icons/nav icons/mobile/close-sm-svgrepo-com.svg"
import trash_icon from "../../assets/icons/nav icons/trash-slash-alt-svgrepo-com.svg"
import { useCart } from "../../hook/useCart"

export const Cart = () => {

  const { cart, addToCart, removeFromCart, getCartQuantity, clearCart } = useCart()

  const [openCart, setOpenCart] = useState(false);

  function cartClasses() {
    let classes = "fixed top-0 left-0 w-screen h-screen z-10 -bg--color-white"
    !openCart && (classes += " hidden")
    return classes
  }

  function viewCart() {
    setOpenCart(!openCart)
    console.log(cart)
  }

  return (
    <>
      <button onClick={() => viewCart()} className="h-full relative">
        <img src={bag_icon} alt="Bag Icon" className="h-full w-8" />
        {getCartQuantity() > 0 &&
          <span className="absolute bottom-4 -bg--color-black -text--color-light-grey-violet rounded-full w-6 h-6 font-semibold"> {getCartQuantity()} </span>
        }
      </button>

      <aside className={cartClasses()}>
        <header className="w-full text-end h-20 border-b -border--color-very-light-grey">
          <button onClick={() => setOpenCart(!openCart)} className="px-4 h-full">
            <img src={close_icon} alt="close" />
          </button>
        </header>
        <ul className="h-2/3 overflow-y-scroll">
          {
            cart.length === 0 &&
            <section className="w-full grid place-content-center h-full">
              <img src={bag_icon} alt="Bag icon" className="w-40 m-auto" />
              <h2 className="text-xl font-semibold opacity-60"> Your Bag is Empty! :( </h2>
            </section>
          }
          {cart.map(item => {
            return (
              <li className="w-11/12 grid grid-cols-3 p-4 m-auto gap-2 border-b -border--color-very-light-grey">
                <img className="w-20 row-span-2" src={item.product.image} alt={item.product.name} />
                <section className="col-span-2">
                  <strong> {item.product.name} </strong>
                  <button className="float-end">
                    <img src={trash_icon} className="w-6" />
                  </button>
                  <p>{item.product.category}</p>
                  <p className="font-bold"> ${item.product.price} </p>
                  <p className=""> <strong> Total </strong> - ${item.product.price * item.quantity} </p>
                </section>
                <footer className="m-auto ml-0 font-semibold text-lg col-span-2 grid grid-cols-3 w-32 rounded-lg overflow-hidden">
                  <button onClick={() => removeFromCart(item.product)} className="-bg--color-light-grey-violet"> - </button>
                  <small className="m-aut w-full py-2 text-center">
                    {item.quantity}
                  </small>
                  <button onClick={() => addToCart(item.product)} className="-bg--color-light-grey-violet"> + </button>
                </footer>
              </li>
            )
          })}
        </ul>
        <footer className="-bg--color-white w-full text-center font-bold absolute bottom-0 py-4">
          <button onClick={() => clearCart()} className="w-10/12 py-4 rounded-full -bg--color-white -text--color-red border-4 shadow-md -shadow--color-greyest-violet">
            CLEAR BAG
          </button>
          <button className="w-10/12 py-4 mt-4 rounded-full -bg--color-black -text--color-light-grey-violet shadow-md -shadow--color-greyest-violet">
            BUY BAG
          </button>
        </footer>
      </aside>
    </>
  )
}