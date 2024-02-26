import { useState } from "react"
import bag_icon from "../../assets/icons/nav icons/bag-shopping.svg"
import close_icon from "../../assets/icons/nav icons/mobile/close-sm-svgrepo-com.svg"
import { useCart } from "../../hook/useCart"

export const Cart = () => {

  const { cart, addToCart, removeFromCart, getCartQuantity } = useCart()

  const [openCart, setOpenCart] = useState(false);

  function cartClasses() {
    let classes = "absolute top-0 left-0 w-screen h-screen z-10 -bg--color-white"
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
        <header className="w-full text-end">
          <button onClick={() => setOpenCart(!openCart)} className="p-2">
            <img src={close_icon} alt="close" />
          </button>
        </header>
        <ul className="w-11/12 m-auto mr-0">
          {cart.map(item => {
            return (
              <li className="grid grid-cols-3 p-4">
                <img className="w-20 row-span-2" src={item.product.image} alt={item.product.name} />
                <section className="col-span-2">
                  <strong> {item.product.name} </strong>
                  <p> ${item.product.price} </p>
                </section>
                <footer className="m-auto ml-0 font-semibold text-lg col-span-2 grid grid-cols-3 w-40 rounded-lg overflow-hidden">
                  <button onClick={() => removeFromCart(item.product)} className="-bg--color-light-grey-violet"> - </button>
                  <small className="m-aut w-full py-2 text-center">
                    {item.quantity}
                  </small>
                  <button onClick={() => addToCart(item.product)} className="-bg--color-light-grey-violet px-4 py-2"> + </button>
                </footer>
              </li>
            )
          })}
        </ul>
      </aside>
    </>
  )
}