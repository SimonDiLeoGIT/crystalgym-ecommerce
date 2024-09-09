import { Link } from "react-router-dom"
import { useOrder } from "../../hook/useOrder"
import open from "../../assets/icons/open.svg"
import delete_icon from "../../assets/icons/nav icons/trash-slash-alt-svgrepo-com.svg"
import { useEffect } from "react"
import { ProductInterface } from "../../interfaces/ProductInterfaces"

export const Orders = () => {

  const { orders, unconfirmedOrderExists, confirmOrder, unconfirmedOrder, cancelOrder, cancelUnconfirmedOrder, removeFromPreOrder } = useOrder()

  useEffect(() => {
    window.scrollTo(0, 0)

  }, []);


  function handleConfirm() {
    confirmOrder()
    setTimeout(() =>
      alert("Confirmed purchase. \n THANKS :) "), 400
    )
  }

  function handleCancelOrder(orderId: number) {
    const confirm = window.confirm("Are you sure you want to cancel this order? \n :(")
    confirm && cancelOrder(orderId)
  }

  function handleRemoveFromPreOrder(product: ProductInterface) {
    const confirm = window.confirm("Are you sure you want to remove this item from order? \n :(")
    confirm && removeFromPreOrder(product)
  }

  return (
    <section className="-text--color-black">
      {orders.length === 0 && !unconfirmedOrderExists &&
        <article className="min-h-96 grid place-content-center -bg--color-very-light-grey bg-opacity-30 rounded-3xl my-8 gap-8">
          <h2 className="text-3xl font-bold">There's no orders :(</h2>
          <p>Find a product you like, add it to your cart, and proceed to purchase.</p>
          <Link to="/new-this-month" className="text-center -bg--color-black -text--color-light-grey-violet font-bold p-4 rounded-full w-11/12 max-w-lg m-auto mb-4 duration-150 hover:opacity-85">Shop Products</Link>
        </article>
      }
      <ul className="min-w-64">
        {
          unconfirmedOrderExists
          &&
          <li className="text-center -bg--color-light-grey-violet bg-opacity-60 rounded-3xl my-8 p-8 gap-8">
            <h2 className="text-xl font-bold"> New Order! </h2>
            <ul className="lg:grid grid-cols-2 gap-4">
              {unconfirmedOrder.order.map(currOrder => {
                return (
                  <li className="p-2 my-2 -bg--color-white rounded-xl flex md:p-4 items-center">
                    <img src={currOrder.product.images[0]} className="h-20 md:h-32" />
                    <div className="text-sm font-semibold px-2 md:text-base  md:px-6">
                      <p className="font-bold">{currOrder.product.name}</p>
                      <p>Price:${currOrder.product.price}</p>
                      <p>Quantity: {currOrder.quantity}</p>
                      <p>Subtotal: ${currOrder.quantity * currOrder.product.price}</p>
                    </div>
                    <div className="m-auto mr-2">
                      <button onClick={() => handleRemoveFromPreOrder(currOrder.product)} className="duration-150 hover:bg-opacity-50 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-very-light-grey rounded-full">
                        <img src={delete_icon} className="w-10 min-w-10 p-2" />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="text-lg"><strong>Total:</strong> ${unconfirmedOrder.total}</p>
            <p className=""> Are you sure you want to buy these items? </p>
            <div className="m-auto my-4">
              <button onClick={() => cancelUnconfirmedOrder()} className="w-full max-w-72 mx-4 font-bold py-4 rounded-full -bg--color-white -text--color-red border-4 shadow-md -shadow--color-greyest-violet duration-150 hover:-bg--color-red hover:bg-opacity-60 hover:-shadow--color-red">
                CANCEL
              </button>
              <input type="submit" value="CONFIRM" onClick={() => handleConfirm()} className="w-full max-w-72 mx-4 m-auto py-5 mt-4 rounded-full font-bold -bg--color-black -text--color-light-grey-violet shadow-md -shadow--color-greyest-violet duration-150 hover:opacity-85 hover:cursor-pointer" />
            </div>
          </li>
        }
        {orders.map(order => {
          return (
            <li className="-bg--color-very-light-grey bg-opacity-30 p-4 rounded-3xl my-4 md:p-6 md:my-8 w-full">
              <p className="md:text-lg  font-bold">{order.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</p>
              <ul className="lg:grid grid-cols-2 gap-4">
                {order.order.map(currOrder => {
                  return (
                    <li className="text-center p-2 my-2 -bg--color-white rounded-xl flex md:p-4 items-center">
                      <img src={currOrder.product.images[0]} className="h-20 md:h-32" />
                      <div className="text-sm font-semibold px-2 md:text-base  md:px-6">
                        <p className="font-bold">{currOrder.product.name}</p>
                        <p>Price:${currOrder.product.price}</p>
                        <p>Quantity: {currOrder.quantity}</p>
                        <p>Subtotal: ${currOrder.quantity * currOrder.product.price}</p>
                      </div>
                      <Link
                        to={`/product/${currOrder.product.id}/${currOrder.product.colorId}`}
                        className="m-auto mr-4 block duration-150 hover:bg-opacity-50 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-very-light-grey rounded-full"
                      >
                        <img src={open} className="w-10 min-w-10 p-2" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <p className="md:text-lg"><strong>Total:</strong> ${order.total}</p>
              <div className="w-full text-center">
                <button onClick={() => handleCancelOrder(order.id)} className="w-72 font-bold py-4 rounded-full -bg--color-white -text--color-red border-4 shadow-md -shadow--color-greyest-violet duration-150 hover:-bg--color-red hover:bg-opacity-60 hover:-shadow--color-red">
                  CANCEL ORDER
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}