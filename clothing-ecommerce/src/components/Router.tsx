import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Navbar } from "./Navbar"
// import { Women } from "../pages/Women/Women"
// import { Men } from "../pages/Men/Men"
// import { Accessories } from "../pages/Accessories/Accessories"
import { Footer } from "./Footer"
import { Men } from "../pages/Men/Men"


export const Router = () => {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        {/* <Route path="/women" element={<Women />} />
        <Route path="/accessories" element={<Accessories />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}