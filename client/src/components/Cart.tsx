import bag_icon from "../assets/icons/nav icons/bag-shopping.svg"
import image from "../assets/images/men/clothes/Jogger/Easy Care/Grey/easy-care-1.jpg"
import "../styles/cart.css"

export const Cart = () => {
  return (
    <>
      <img src={bag_icon} alt="Bag Icon" className="h-full w-8" />
      <input type="checkbox" hidden />

      <aside className="hidden absolute top-0 left-0 w-screen h-screen z-10 flex place-content-center -bg--color-black bg-opacity-60">
        <ul className="w-3/4 m-auto -bg--color-white p-4">
          <li>
            <img src={image} alt="Article image" />
            <div>
              <strong> Article name </strong> - $price
            </div>
            <footer>
              <button> - </button>
              <small>
                Qty: 1
              </small>
              <button> + </button>
            </footer>
          </li>
        </ul>
      </aside>
    </>
  )
}