import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

const Home = lazy(() => import("../../pages/Home"))
const Women = lazy(() => import("../../pages/Women"))
const Men = lazy(() => import("../../pages/Men"))
const Accessories = lazy(() => import("../../pages/Accessories"))
const NewsProducts = lazy(() => import("../../pages/NewsProducts"))
const Accessory = lazy(() => import("../../pages/Accessory"))
const Product = lazy(() => import("../../pages/Product"))
const Category = lazy(() => import("../../pages/Category"))
const Profile = lazy(() => import("../../pages/Profile"))
const TerminosCondiciones = lazy(() => import("../../pages/TerminosCondiciones"))
const Navbar = lazy(() => import("../Navbar/Navbar"))
const Footer = lazy(() => import("../Footer/Footer"))
const Register = lazy(() => import("../../pages/Register"))
const Login = lazy(() => import("../../pages/Login"))
const UserProvider = lazy(() => import("../../context/user"))

const Router = () => {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <BrowserRouter>
        <header className="h-20">
            <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/:type/all" element={<NewsProducts />} />
          <Route path="/accessories/:category" element={<Accessory />} />
          <Route path="/:sex/:category" element={<Category />} />
          <Route path="/:type/news/gym-clothes" element={<NewsProducts />} />
          <Route path="/:type" element={<NewsProducts />} />
          <Route path="/product/:id/:colorId" element={<Product />} />
          <Route path="/register" element={<UserProvider><Register /></UserProvider>} />
          <Route path="/login" element={<UserProvider><Login /></UserProvider>} />
          <Route path="/profile" element={<UserProvider><Profile /></UserProvider>} />
          <Route path="/terms&conditions" element={<TerminosCondiciones />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Suspense>
  )
}

export default Router