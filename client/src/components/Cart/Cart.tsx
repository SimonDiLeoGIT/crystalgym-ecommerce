import { useState } from "react"
import bag_icon from "../../assets/icons/nav icons/bag-shopping.svg"
import close_icon from "../../assets/icons/nav icons/mobile/close-sm-svgrepo-com.svg"
import trash_icon from "../../assets/icons/nav icons/trash-slash-alt-svgrepo-com.svg"
import { useCart } from "../../hook/useCart"

export const Cart = () => {

  const { cart, addToCart, removeFromCart, clearFromCart, getCartQuantity, clearCart } = useCart()

  const [openCart, setOpenCart] = useState(false);

  function cartClasses() {
    let classes = "fixed bottom-0 left-0 w-screen h-screen z-10 -bg--color-white grid place-content-start"
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
        <header className="w-screen text-end h-20 border-b -border--color-very-light-grey">
          <button onClick={() => setOpenCart(!openCart)} className="px-4 h-full">
            <img src={close_icon} alt="close" />
          </button>
        </header>
        <ul className="overflow-y-scroll w-screen mb-44">
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
                  item.product.image.map(image => {
                    return (
                      image.color.colorId === item.colorId
                      &&
                      <img className="w-20 row-span-2" src={image.src[0]} alt={item.product.name} />
                    )
                  })
                }
                <section className="col-span-2 relative">
                  <p className="w-3/4"><strong> {item.product.name} </strong></p>
                  <button onClick={() => clearFromCart(item.product, item.colorId)} className="absolute top-0 right-0">
                    <img src={trash_icon} className="w-6" />
                  </button>
                  <p>{item.product.category}</p>
                  <p className="font-bold"> ${item.product.price} </p>
                  <p className=""> <strong> Total </strong> - ${item.product.price * item.quantity} </p>
                </section>
                <footer className="m-auto ml-0 font-semibold text-lg col-span-2 grid grid-cols-3 w-32 rounded-lg overflow-hidden">
                  <button onClick={() => removeFromCart(item.product, item.colorId)} className="-bg--color-light-grey-violet"> - </button>
                  <small className="m-aut w-full py-2 text-center">
                    {item.quantity}
                  </small>
                  <button onClick={() => addToCart(item.product, item.colorId)} className="-bg--color-light-grey-violet"> + </button>
                </footer>
              </li>
            )
          })}
        </ul>
        {
          cart.length > 0 &&
          <footer className="-bg--color-white w-full text-center font-bold absolute bottom-0 py-4">
            <button onClick={() => clearCart()} className="w-10/12 py-4 rounded-full -bg--color-white -text--color-red border-4 shadow-md -shadow--color-greyest-violet">
              CLEAR BAG
            </button>
            <button className="w-10/12 py-4 mt-4 rounded-full -bg--color-black -text--color-light-grey-violet shadow-md -shadow--color-greyest-violet">
              BUY BAG
            </button>
          </footer>
        }
      </aside>
    </>
  )
}