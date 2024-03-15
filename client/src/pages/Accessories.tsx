import { ProductsAdvertisement } from "../components/ProductsAdvertisement/ProductsAdvertisement"
import posts from "../assets/json/posts.json"
import gym_accessories from "../assets/json/accessories/advertisement/gym-accessories.json"
import cap from "../assets/json/accessories/advertisement/cap.json"

import { Carousel } from "../components/Carousel/Carousel"

export const Accessories = () => {
  return (
    <main className="max-w-screen overflow-x-hidden font-roboto">
      <header>
        {/* <Carousel
          advertisement={gym_accessories.advertisement} mobileImages={gym_accessories.mobileImages} desktopImages={gym_accessories.desktopImages}
        /> */}
      </header>
      {/* <ProductsAdvertisement posts={posts.posts} title="Gym Accessories" /> */}
      <Carousel
        advertisement={cap.advertisement} mobileImages={cap.mobileImages} desktopImages={cap.desktopImages}
      />
      {/* <ProductsAdvertisement posts={posts.posts} title="Urban Caps" /> */}
    </main>
  )
}