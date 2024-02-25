import { ReactNode, createContext, useState } from "react";

interface Product {
  id: string,
  name: string,
  category: string,
  sex: string,
  new: boolean,
  image: string,
  price: number,
}

interface CartItem {
  id: string,
  name: string,
  image: string,
  price: number,
  quantity: number
}

type product = Product
type cartItem = CartItem

interface Props {
  children: ReactNode
}

type CartContext = {
  getCartItems: () => cartItem[],
  addToCart: (product: product) => void,
  removeFromCart: (product: product) => void,
}

export const CartContext = createContext({} as CartContext)

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<cartItem[]>([])

  function getCartItems() {
    return cart
  }

  const addToCart = (product: product) => {
    setCart(currItems => {
      if (currItems.find(item => item.id === product.id) == null) {
        return [...cart, { product, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
    console.log(cart)
  }

  const removeFromCart = (product: product) => {
    setCart(currItems => {
      if (currItems.find(item => item.id === product.id)?.quantity === 1) {
        return currItems.filter(item => item.id !== product.id)
      } else {
        return currItems.map(item => {
          if (item.id === product.id) {
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
      getCartItems,
      addToCart,
      removeFromCart,
    }}
    >
      {children}
    </CartContext.Provider>
  )
}