import { lazy } from "react"
import './styles/global/fonts.css'
import UserProvider from "./context/user"

const Router = lazy(() => import("./components/Router/Router"))
const CartProvider = lazy(() => import("./context/cart"))
const OrderProvider = lazy(() => import("./context/order"))

function App() {

  return (
    <UserProvider>
      <OrderProvider>
        <CartProvider>
          <Router />
        </CartProvider>
      </OrderProvider>
    </UserProvider>
  )
}

export default App
