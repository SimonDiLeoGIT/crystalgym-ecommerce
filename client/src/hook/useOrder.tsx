import { useContext } from "react";
import { OrderContext } from "../context/order";

export const useOrder = () => {
  const context = useContext(OrderContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}