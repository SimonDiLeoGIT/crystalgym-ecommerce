import { ReactNode, createContext, useState } from "react";

interface Product {
  id: string,
  quantity: number
}

type product = Product
interface Props {
  children: ReactNode
}

type CartContext = {
  addToCart: (id: string) => void,
  removeFromCart: (id: string) => void,
}

export const CartContext = createContext({} as CartContext)

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<product[]>([])

  const addToCart = (id: string) => {
    setCart(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...cart, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
    console.log(cart)
  }

  const removeFromCart = (id: string) => {
    setCart(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  // const clearCart = () => {
  //   setCart([])
  // }

  return (
    <CartContext.Provider value={{
      addToCart,
      removeFromCart,
    }}
    >
      {children}
    </CartContext.Provider>
  )
}