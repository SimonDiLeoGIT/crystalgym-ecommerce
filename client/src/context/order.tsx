import { ReactNode, createContext, useState } from "react";

type product = ProductInterface

interface OrderItem {
  product: product
  quantity: number
}

interface Props {
  children: ReactNode
}

type OrderContext = {
  getOrders: () => OrderItem[][],
  addOrder: (products: OrderItem[]) => void,
  // removeFromOrder: (product: product) => void,
}


export const OrderContext = createContext({} as OrderContext)

export const OrderProvider = ({ children }: Props) => {

  const [orders, setOrders] = useState<OrderItem[][]>([])

  const addOrder = (products: OrderItem[]) => {
    // orders.length > 0 ?
    setOrders([...orders, products])
    // : setOrders([products])
    console.log(orders)
  }

  const getOrders = () => {
    return orders
  }

  return (
    <OrderContext.Provider value={{
      addOrder,
      getOrders
    }}
    >
      {children}
    </OrderContext.Provider>
  )
}