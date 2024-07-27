import ProductsAdvertisement from "../components/ProductsAdvertisement/ProductsAdvertisement"
import accessories from "../assets/json/shop/accessories.json"
import gym_accessories from "../assets/json/accessories/advertisement/gym-accessories.json"
import cap from "../assets/json/accessories/advertisement/cap.json"
import caps from "../assets/json/accessories/post/cap.json"

import Carousel from "../components/Carousel/Carousel"
import { useEffect } from "react"

const Accessories = () => {

  useEffect(() => {
    document.title = "Accessories | CrystalGym";
  })

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <header>
        <Carousel
          advertisement={gym_accessories.advertisement} mobileImages={gym_accessories.mobileImages} desktopImages={gym_accessories.desktopImages}
        />
      </header>
      <ProductsAdvertisement products={accessories} title="Gym Accessories" link="/accessories/all" />
      <Carousel
        advertisement={cap.advertisement} mobileImages={cap.mobileImages} desktopImages={cap.desktopImages}
      />
      <ProductsAdvertisement products={caps} title="Caps" link="/accessories/Cap" />
    </main>
  )
}

export default Accessories;