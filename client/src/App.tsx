import { lazy } from "react"
// import { Router } from "./components/Router/Router"
// import { CartProvider } from "./context/cart"
// import { OrderProvider } from "./context/order"
import './styles/global/fonts.css'

const Router = lazy(() => import("./components/Router/Router"))
const CartProvider = lazy(() => import("./context/cart"))
const OrderProvider = lazy(() => import("./context/order"))

function App() {

  return (
    <OrderProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </OrderProvider>
  )
}

export default App
