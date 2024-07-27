import ProductsAdvertisement from "../components/ProductsAdvertisement/ProductsAdvertisement"
import gym_clothes from "../assets/json/men/advertisement/gym-clothes.json"
import gym_clothes_post from "../assets/json/men/post/gym-clothes.json"
import hoodies from "../assets/json/men/advertisement/hoodies.json"
import hoodies_post from "../assets/json/men/post/hoodies.json"

import Carousel from "../components/Carousel/Carousel"
import { useEffect } from "react"

const Men = () => {

  useEffect(() => {
    document.title = "Men | CrystalGym";
  })

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <header>
        <Carousel
          advertisement={gym_clothes.advertisement} mobileImages={gym_clothes.mobileImages} desktopImages={gym_clothes.desktopImages}
        />
      </header>
      <ProductsAdvertisement products={gym_clothes_post} title="Gym Clothes" link="/men/news/gym-clothes" />
      <Carousel
        advertisement={hoodies.advertisement} mobileImages={hoodies.mobileImages} desktopImages={hoodies.desktopImages}
      />
      <ProductsAdvertisement products={hoodies_post} title="All Hoodies" link="/men/Hoodie" />
    </main>
  )
}

export default Men;