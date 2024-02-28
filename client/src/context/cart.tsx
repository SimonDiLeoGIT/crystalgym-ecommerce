import { ReactNode, createContext, useState } from "react";

type product = ProductInterface

interface CartItem {
  product: product
  quantity: number
}

type cartItem = CartItem

interface Props {
  children: ReactNode
}

type CartContext = {
  getCartItems: () => cartItem[],
  addToCart: (product: product) => void,
  removeFromCart: (product: product) => void,
  clearFromCart: (product: product) => void,
  cart: cartItem[]
  getCartQuantity: () => number,
  clearCart: () => void
}

export const CartContext = createContext({} as CartContext)

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<cartItem[]>([])

  const getCartItems = () => {
    return cart
  }

  const getCartQuantity = () => {
    let quantity = 0;
    cart.map(item => {
      quantity += item.quantity
    })
    return quantity
  }

  const addToCart = (product: product) => {
    setCart(currItems => {
      if (currItems.find(item => item.product.id === product.id) == null) {
        return [...cart, { product, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.product.id === product.id) {
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
      if (currItems.find(item => item.product.id === product.id)?.quantity === 1) {
        return currItems.filter(item => item.product.id !== product.id)
      } else {
        return currItems.map(item => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const clearFromCart = (product: product) => {
    setCart(currItems => {
      return currItems.filter(item => item.product.id !== product.id)
    })
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      getCartItems,
      addToCart,
      removeFromCart,
      clearFromCart,
      cart,
      getCartQuantity,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}