import { ProductsAdvertisement } from "../components/ProductsAdvertisement/ProductsAdvertisement"
import gym_clothes from "../assets/json/women/advertisement/gym-clothes.json"
import gym_clothes_post from "../assets/json/women/post/gym-clothes.json"
import tops from "../assets/json/women/advertisement/tops.json"
import tops_post from "../assets/json/women/post/tops.json"

import { Carousel } from "../components/Carousel/Carousel"

export const Women = () => {

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <header>
        <Carousel
          advertisement={gym_clothes.advertisement} mobileImages={gym_clothes.mobileImages} desktopImages={gym_clothes.desktopImages}
        />
      </header>
      <ProductsAdvertisement products={gym_clothes_post} title="Gym Clothes" link="/women/news/gym-clothes" />
      <Carousel
        advertisement={tops.advertisement} mobileImages={tops.mobileImages} desktopImages={tops.desktopImages}
      />
      <ProductsAdvertisement products={tops_post} title="Training Tops" link="/women/Top" />
    </main>
  )
}