import { ReactNode, createContext, useState } from "react";

type product = ProductInterface


interface OrderItem {
  product: product
  quantity: number
}

interface Order {
  id: number,
  order: OrderItem[],
  total: number,
  date: Date
}

interface Props {
  children: ReactNode
}

type OrderContext = {
  getOrders: () => Order[],
  addOrder: (products: OrderItem[]) => void,
  confirmOrder: () => void,
  orders: Order[],
  unconfirmedOrder: Order,
  unconfirmedOrderExists: boolean,
  cancelOrder: (orderId: number) => void,
  cancelUnconfirmedOrder: () => void,
  // removeFromOrder: (product: product) => void,
}


export const OrderContext = createContext({} as OrderContext)

export const OrderProvider = ({ children }: Props) => {

  const [orders, setOrders] = useState<Order[]>([])
  const [unconfirmedOrder, setUnconfirmedOrder] = useState<Order>({ id: 0, order: [], date: new Date(), total: 0 })
  const [unconfirmedOrderExists, setUnconfirmedOrderExists] = useState<boolean>(false)
  const [nextId, setNextId] = useState(1)

  const addOrder = (products: OrderItem[]) => {
    let totalPrice = 0;

    const date = new Date()

    products.map(p => {
      totalPrice += (p.quantity * p.product.price)
    })

    if (!unconfirmedOrderExists) {
      setUnconfirmedOrder({ id: nextId, order: products, total: totalPrice, date: date })
      setUnconfirmedOrderExists(true)
      setNextId(nextId + 1)
    } else {
      const newUnconfirmedOrder = unconfirmedOrder
      products.map(p => {
        newUnconfirmedOrder.order.push(p)
      })
      newUnconfirmedOrder.total += totalPrice
      setUnconfirmedOrder(newUnconfirmedOrder)
    }

    console.log(orders)
  }

  const confirmOrder = () => {
    if (unconfirmedOrderExists) {
      setOrders([unconfirmedOrder, ...orders])
      clearUnconfirmed()
    }
  }

  const cancelOrder = (orderId: number) => {
    setOrders(orders.filter(order => order.id !== orderId))
  }

  const cancelUnconfirmedOrder = () => {
    clearUnconfirmed()
  }

  function clearUnconfirmed() {
    setUnconfirmedOrder({ id: 0, order: [], date: new Date(), total: 0 })
    setUnconfirmedOrderExists(false)
  }

  const getOrders = () => {
    return orders
  }

  return (
    <OrderContext.Provider value={{
      addOrder,
      getOrders,
      orders,
      unconfirmedOrder,
      confirmOrder,
      unconfirmedOrderExists,
      cancelOrder,
      cancelUnconfirmedOrder
    }}
    >
      {children}
    </OrderContext.Provider>
  )
}