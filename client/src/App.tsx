import { Router } from "./components/Router/Router"
import { CartProvider } from "./context/cart"
import { OrderProvider } from "./context/order"
import './styles/global/fonts.css'

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
