import { useOrder } from "../../hook/useOrder"

export const Orders = () => {

  const { orders } = useOrder()

  return (
    <>
      <ul>
        {orders.map(order => {
          return (
            <li>
              <ul>
                {order.order.map(currOrder => {
                  return (
                    <li>
                      {currOrder.product.name}
                      <img src={currOrder.product.images[0]} />
                    </li>
                  )
                })}
              </ul>
              <p>${order.total}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}