import { Router } from "./components/Router/Router"
import { CartProvider } from "./context/cart"
import './styles/global/fonts.css'

function App() {

  return (
    <CartProvider>
      <Router />
    </CartProvider>
  )
}

export default App
