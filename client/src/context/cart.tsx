import { createContext, useState } from "react";


interface Product {
  id: string,
  name: string,
  category: string,
  sex: string,
  new: boolean,
  image: string,
  price: number
}

interface CartState {
  productCount: number,
  products: Product[],
  total: number
}

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