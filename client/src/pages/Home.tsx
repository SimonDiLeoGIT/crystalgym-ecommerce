import { Posts_Section } from "../components/ProductsAdvertisement/ProductsAdvertisement"
import new_this_month from "../assets/json/home/advertisement/new-this-month.json"
import new_this_month_posts from "../assets/json/home/post/new-this-month.json"
import off_20 from "../assets/json/home/advertisement/20-off.json"
import off_20_posts from "../assets/json/home/post/20-off.json"

import { Carousel } from "../components/Carousel/Carousel"

export const Home = () => {

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto">
      <header>
        <Carousel
          advertisement={new_this_month.advertisement} images={new_this_month.images}
        />
      </header>
      <Posts_Section posts={new_this_month_posts.posts} title="New This Month" />
      <Carousel
        advertisement={off_20.advertisement} images={off_20.images}
      />
      <Posts_Section posts={off_20_posts.posts} title="20% Off" />
    </main>
  )
}