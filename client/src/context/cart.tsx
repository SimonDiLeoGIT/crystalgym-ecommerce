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

type product = Product

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
  cart: cartItem[]
  getCartQuantity: () => number
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
  // const clearCart = () => {
  //   setCart([])
  // }

  return (
    <CartContext.Provider value={{
      getCartItems,
      addToCart,
      removeFromCart,
      cart,
      getCartQuantity
    }}
    >
      {children}
    </CartContext.Provider>
  )
}