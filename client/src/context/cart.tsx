import { ReactNode, createContext, useState } from "react";

type product = ProductInterface

interface CartItem {
  product: product
  quantity: number
  colorId: string
}

type cartItem = CartItem

interface Props {
  children: ReactNode
}

type CartContext = {
  getCartItems: () => cartItem[],
  addToCart: (product: product, color: string) => void,
  removeFromCart: (product: product, color: string) => void,
  clearFromCart: (product: product, color: string) => void,
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

  const addToCart = (product: product, color: string) => {
    setCart(currItems => {
      if (currItems.find(item => item.product.id === product.id && item.colorId === color) == null) {
        return [...cart, { product, quantity: 1, colorId: color }]
      } else {
        return currItems.map(item => {
          if (item.product.id === product.id && item.colorId === color) {
            return { ...item, quantity: item.quantity + 1, colorId: color }
          } else {
            return item
          }
        })
      }
    })
    console.log(cart)
  }

  const removeFromCart = (product: product, color: string) => {
    setCart(currItems => {
      if (currItems.find(item => item.product.id === product.id && item.colorId === color)?.quantity === 1) {
        return currItems.filter(item => item.product.id !== product.id)
      } else {
        return currItems.map(item => {
          if (item.product.id === product.id && item.colorId === color) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const clearFromCart = (product: product, color: string) => {
    setCart(currItems => {
      return currItems.filter(item => item.product.id !== product.id || (item.product.id === product.id && item.colorId !== color))
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