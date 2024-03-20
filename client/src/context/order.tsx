import { ReactNode, createContext, useState } from "react";

type product = ProductInterface

interface Props {
  children: ReactNode
}

type OrderContext = {
  getOrders: () => [product[]],
  addOrder: (products: product[]) => void,
  // removeFromOrder: (product: product) => void,
}


export const OrderContext = createContext({} as OrderContext)

export const OrderProvider = ({ children }: Props) => {

  const [orders, setOrders] = useState<[product[]]>([[]])

  const addOrder = (products: product[]) => {
    setOrders(...[], [products])
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