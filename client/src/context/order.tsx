import { ReactNode, createContext, useState } from "react";

type product = ProductInterface


interface OrderItem {
  product: product
  quantity: number
}

interface Order {
  order: OrderItem[],
  total: number
}

interface Props {
  children: ReactNode
}

type OrderContext = {
  getOrders: () => Order[],
  addOrder: (products: OrderItem[]) => void,
  orders: Order[]
  // removeFromOrder: (product: product) => void,
}


export const OrderContext = createContext({} as OrderContext)

export const OrderProvider = ({ children }: Props) => {

  const [orders, setOrders] = useState<Order[]>([])

  const addOrder = (products: OrderItem[]) => {
    let totalPrice = 0;
    products.map(p => {
      totalPrice += (p.quantity * p.product.price)
    })
    setOrders([...orders, { order: products, total: totalPrice }])
    console.log(orders)
  }

  const getOrders = () => {
    return orders
  }

  return (
    <OrderContext.Provider value={{
      addOrder,
      getOrders,
      orders
    }}
    >
      {children}
    </OrderContext.Provider>
  )
}