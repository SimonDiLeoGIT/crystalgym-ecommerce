import { createContext, useState } from "react";
import { CartState, Product } from "../interfaces/interfaces";

interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: CartState = {
  productCount: 0,
  products: [],
  total: 0
}

export const CartContext = createContext({

})

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState([])

  const addToCart = (product: Product) => {

  }
  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}