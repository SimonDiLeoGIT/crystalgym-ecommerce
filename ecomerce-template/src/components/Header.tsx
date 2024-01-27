import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Navbar } from "./Navbar"
import { Women } from "../pages/Women/Women"
import { Men } from "../pages/Men/Men"
import { Accessories } from "../pages/Accessories/Accessories"


export const Header = () => {
  return (
    <header className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/accessories" element={<Accessories />} />
        </Routes>
      </BrowserRouter>
    </header>
  )
}