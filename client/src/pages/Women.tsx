import { ProductsAdvertisement } from "../components/ProductsAdvertisement/ProductsAdvertisement"
import gym_clothes from "../assets/json/women/advertisement/gym-clothes.json"
import gym_clothes_post from "../assets/json/women/post/gym-clothes.json"
import tops from "../assets/json/women/advertisement/tops.json"
import tops_post from "../assets/json/women/post/tops.json"

import { Carousel } from "../components/Carousel/Carousel"

export const Women = () => {
  return (
    <main className="max-w-screen overflow-x-hidden font-roboto">
      <header>
        <Carousel
          advertisement={gym_clothes.advertisement} images={gym_clothes.images}
        />
      </header>
      <ProductsAdvertisement products={gym_clothes_post} title="Gym Clothes" />
      <Carousel
        advertisement={tops.advertisement} images={tops.images}
      />
      <ProductsAdvertisement products={tops_post} title="Training Tops" />
    </main>
  )
}