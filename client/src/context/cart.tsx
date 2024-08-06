import { ReactNode, createContext, useState } from "react";
import { ProductInterface } from "../interfaces/interfaces";

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
  clearCart: () => void,
  isOpenCart: boolean,
  setIsOpenCart: (isOpen: boolean) => void,
  closeCart: () => void,
  openCart: () => void,
  hiddenCart: boolean,
  orderCart: () => void
}

export const CartContext = createContext({} as CartContext)

const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<cartItem[]>([])
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false)
  const [hiddenCart, setHiddenCart] = useState<boolean>(true)

  const closeCart = () => {
    setIsOpenCart(false)
    setTimeout(() => {
      setHiddenCart(true)
    }, 200)
  }

  const openCart = () => {
    setIsOpenCart(true)
    setHiddenCart(false)
  }

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
      if (currItems.find(item => item.product.id === product.id && item.product.colorId === product.colorId) == null) {
        return [...cart, { product, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.product.id === product.id && item.product.colorId === product.colorId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
    openCart()
  }

  const removeFromCart = (product: product) => {
    setCart(currItems => {
      if (currItems.find(item => item.product.id === product.id && item.product.colorId === product.colorId)?.quantity === 1) {
        return currItems.filter(item => item.product.id !== product.id || (item.product.id === product.id && item.product.colorId !== product.colorId))
      } else {
        return currItems.map(item => {
          if (item.product.id === product.id && item.product.colorId === product.colorId) {
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
      return currItems.filter(item => item.product.id !== product.id || (item.product.id === product.id && item.product.colorId !== product.colorId))
    })
  }

  const clearCart = () => {
    setCart([])
    setTimeout(
      closeCart, 200
    )
  }

  const orderCart = () => {
    clearCart()
  }

  return (
    <CartContext.Provider value={{
      getCartItems,
      addToCart,
      removeFromCart,
      clearFromCart,
      cart,
      getCartQuantity,
      clearCart,
      isOpenCart,
      setIsOpenCart,
      closeCart,
      openCart,
      hiddenCart,
      orderCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider