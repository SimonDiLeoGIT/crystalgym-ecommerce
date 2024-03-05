import { ProductsAdvertisement } from "../components/ProductsAdvertisement/ProductsAdvertisement"
import new_this_month from "../assets/json/home/advertisement/new-this-month.json"
import new_this_month_posts from "../assets/json/home/post/new-this-month.json"
import off_20 from "../assets/json/home/advertisement/20-off.json"
import off_20_posts from "../assets/json/home/post/20-off.json"

import { Carousel } from "../components/Carousel/Carousel"

export const Home = () => {

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <header>
        <Carousel
          advertisement={new_this_month.advertisement} images={new_this_month.images}
        />
      </header>
      <ProductsAdvertisement products={new_this_month_posts} title="New This Month" />
      <Carousel
        advertisement={off_20.advertisement} images={off_20.images}
      />
      <ProductsAdvertisement products={off_20_posts} title="20% Off" />
    </main>
  )
}