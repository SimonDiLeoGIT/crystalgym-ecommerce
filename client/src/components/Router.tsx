import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Navbar } from "./Navbar"
import { Women } from "../pages/Women/Women"
import { Accessories } from "../pages/Accessories/Accessories"
import { Footer } from "./Footer"
import { Men } from "../pages/Men/Men"
import { Category } from "../pages/Category"

export const Router = () => {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/men/hoodies" element={<Category title="HOODIES" category="Hoodie" sex="men" />} />
        <Route path="/men/joggers" element={<Category title="JOGGERS" category="Jogger" sex="men" />} />
        <Route path="/men/t-shirt" element={<Category title="T-SHIRT" category="T-Shirt" sex="men" />} />
        <Route path="/men/gym-clothes" element={<Category title="GYM CLOTHES" category="*" sex="men" />} />
        <Route path="/women/hoodies" element={<Category title="HOODIES" category="Hoodie" sex="women" />} />
        <Route path="/women/joggers" element={<Category title="JOGGERS" category="Jogger" sex="women" />} />
        <Route path="/women/t-shirt" element={<Category title="T-SHIRT" category="T-Shirt" sex="women" />} />
        <Route path="/women/tops" element={<Category title="TOPS" category="Top" sex="women" />} />
        <Route path="/women/gym-clothes" element={<Category title="GYM CLOTHES" category="*" sex="women" />} />
        <Route path="/new" element={<Category title="NEW THIS MONTH" category="*" sex="*" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}