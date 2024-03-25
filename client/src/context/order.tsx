import { ReactNode, createContext, useState } from "react";

type product = ProductInterface


interface OrderItem {
  product: product
  quantity: number
}

interface Order {
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
  orderUnconfirmedExists: boolean
  // removeFromOrder: (product: product) => void,
}


export const OrderContext = createContext({} as OrderContext)

export const OrderProvider = ({ children }: Props) => {

  const [orders, setOrders] = useState<Order[]>([])
  const [unconfirmedOrder, setUnconfirmedOrder] = useState<Order>({ order: [], date: new Date(), total: 0 })
  const [orderUnconfirmedExists, setOrderUnconfirmedExists] = useState<boolean>(false)

  const addOrder = (products: OrderItem[]) => {
    let totalPrice = 0;
    products.map(p => {
      totalPrice += (p.quantity * p.product.price)
    })

    const date = new Date()

    setUnconfirmedOrder({ order: products, total: totalPrice, date: date })
    setOrderUnconfirmedExists(true)
    console.log(orders)
  }

  const confirmOrder = () => {
    if (orderUnconfirmedExists) {
      setOrders([unconfirmedOrder, ...orders])
      setUnconfirmedOrder({ order: [], date: new Date(), total: 0 })
      setOrderUnconfirmedExists(false)
    }
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
      orderUnconfirmedExists
    }}
    >
      {children}
    </OrderContext.Provider>
  )
}