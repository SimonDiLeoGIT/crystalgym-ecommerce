import bag_icon from "../../assets/icons/nav icons/bag-shopping.svg"
import { useCart } from "../../hook/useCart"

export const Cart = () => {

  const { getCartItems } = useCart()



  const items = getCartItems();

  return (
    <>
      <button className="h-full">
        <img src={bag_icon} alt="Bag Icon" className="h-full w-8" />
      </button>

      <aside className="hidden absolute top-0 left-0 w-screen h-screen z-10 flex place-content-center -bg--color-black bg-opacity-60">
        <ul className="w-3/4 m-auto -bg--color-white p-4">
          {items.map(item => {
            return (
              <li>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong> {item.name} </strong> - {item.price}
                </div>
                <footer>
                  <button> - </button>
                  <small>
                    Qty: {item.price}
                  </small>
                  <button> + </button>
                </footer>
              </li>
            )
          })}
        </ul>
      </aside>
    </>
  )
}