import { useOrder } from "../../hook/useOrder"

export const Orders = () => {


  const { orders } = useOrder()

  return (
    <section>
      <ul>
        {orders.map(order => {
          return (
            <li className="-bg--color-very-light-grey bg-opacity-30 p-4 rounded-3xl my-2">
              <p className="w">{order.order.length} articles</p>
              <ul className="flex my-2">
                {order.order.map(currOrder => {
                  return (
                    <li className="mx-2">
                      <img src={currOrder.product.images[0]} className="h-20" />
                    </li>
                  )
                })}
              </ul>
              <p className=""><strong>Total:</strong> ${order.total}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}