import { useEffect } from "react"
import { useCart } from "../../hook/useCart"
import bag_icon from "../../assets/icons/nav icons/bag-shopping.svg"
import close_icon from "../../assets/icons/nav icons/mobile/close-sm-svgrepo-com.svg"
import './Cart.css'
import { CartItems } from "./CartItems"

export const Cart = () => {

  const { cart, getCartQuantity, clearCart, isOpenCart, closeCart, openCart, hiddenCart } = useCart()

  function cartClasses() {
    let classes = "fixed top-0 left-0 w-screen h-screen z-50  md:left-0 opacity-animation"
    hiddenCart && (classes += " hidden")
    return classes
  }

  function cartContentClasses() {
    let classes = "fixed h-screen w-full -bg--color-white grid place-content-star md:w-[32rem] md:right-0 top-0 "
    if (isOpenCart) {
      classes += " open-cart"
      document.body.classList.add('none-scroll')
    } else {
      classes += " close-cart"
      document.body.classList.remove('none-scroll')
    }
    return classes
  }

  useEffect(() => {
    window.addEventListener('keydown', closeCart)
  })


  return (
    <>
      <button onClick={() => openCart()} className="h-full">
        <div className="w-10 h-10 flex items-center duration-150 hover:bg-opacity-50 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-very-light-grey rounded-full">
          <img src={bag_icon} alt="Bag Icon" className="m-auto w-8 min-w-6" />
        </div>
        {getCartQuantity() > 0 &&
          <span className="absolute bottom-4 -bg--color-black -text--color-light-grey-violet rounded-full w-6 h-6 font-semibold"> {getCartQuantity()} </span>
        }
      </button>

      <aside className={cartClasses()}>
        <section className={cartContentClasses()}>
          <header className="w-full h-20 flex border-b -border--color-very-light-grey">
            <button onClick={() => closeCart()} className=" w-10 h-10 flex items-center m-auto mr-4 duration-150 hover:bg-opacity-50 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-very-light-grey rounded-full">
              <img src={close_icon} alt="close" className="m-auto w-7" />
            </button>
          </header>
          <CartItems />
          {
            cart.length > 0 &&
            <footer className="-bg--color-white w-full text-center font-bold absolute bottom-0 py-4">
              <button onClick={() => clearCart()} className="w-10/12 py-4 rounded-full -bg--color-white -text--color-red border-4 shadow-md -shadow--color-greyest-violet duration-150 hover:-bg--color-red hover:bg-opacity-60 hover:-shadow--color-red">
                CLEAR BAG
              </button>
              <button className="w-10/12 py-5 mt-4 rounded-full -bg--color-black -text--color-light-grey-violet shadow-md -shadow--color-greyest-violet duration-150 hover:opacity-85">
                BUY BAG
              </button>
            </footer>
          }
        </section>
      </aside>
    </>
  )
}