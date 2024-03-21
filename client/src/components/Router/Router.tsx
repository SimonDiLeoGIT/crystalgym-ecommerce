import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../../pages/Home"
import { Navbar } from "../Navbar/Navbar"
import { Women } from "../../pages/Women"
import { Accessories } from "../../pages/Accessories"
import { Footer } from "../Footer/Footer"
import { Men } from "../../pages/Men"
import { Category } from "../../pages/Category"
import { NewsProducts } from "../../pages/NewsProducts"
import { Product } from "../../pages/Product"
import { Profile } from "../../pages/Profile"
import newThisMonthProducts from "../../assets/json/home/advertisement/new-this-month-products.json"
import OffProducts from "../../assets/json/home/advertisement/20-off-products.json"
import menGymClothing from "../../assets/json/men/advertisement/gym-clothes-products.json"
import womenGymClothing from "../../assets/json/women/advertisement/gym-clothes-products.json"
import gymAccessories from "../../assets/json/shop/accessories.json"
import { Accessory } from "../../pages/Accessory"
import { TerminosCondiciones } from "../../pages/TerminosCondiciones"

export const Router = () => {
  return (
    <BrowserRouter>
      <header className="h-20">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/accessories/all" element={<NewsProducts title="GYM ACCESSORIES" products={gymAccessories} />} />
        <Route path="/accessories/:category" element={<Accessory />} />
        <Route path="/:sex/:category" element={<Category />} />
        <Route path="/men/news/gym-clothes" element={<NewsProducts title="GYM CLOTHES" products={menGymClothing} />} />
        <Route path="/women/news/gym-clothes" element={<NewsProducts title="GYM CLOTHES" products={womenGymClothing.all} />} />
        <Route path="/new" element={<NewsProducts title="NEW THIS MONTH" products={newThisMonthProducts} />} />
        <Route path="/20-off" element={<NewsProducts title="20% OFF" products={OffProducts} />} />
        <Route path="/product/:id/:colorId" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/terms&conditions" element={<TerminosCondiciones />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}