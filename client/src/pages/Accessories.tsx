import { Posts_Section } from "../components/ProductsAdvertisement/ProductsAdvertisement"
import posts from "../assets/json/posts.json"
import gym_accessories from "../assets/json/accessories/advertisement/gym-accessories.json"
import cap from "../assets/json/accessories/advertisement/cap.json"

import { Carousel } from "../components/Carousel/Carousel"

export const Accessories = () => {
  return (
    <main className="max-w-screen overflow-x-hidden font-roboto">
      <header>
        <Carousel
          advertisement={gym_accessories.advertisement} images={gym_accessories.images}
        />
      </header>
      <Posts_Section posts={posts.posts} title="Gym Accessories" />
      <Carousel
        advertisement={cap.advertisement} images={cap.images}
      />
      <Posts_Section posts={posts.posts} title="Urban Caps" />
    </main>
  )
}