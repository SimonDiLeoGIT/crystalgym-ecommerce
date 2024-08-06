import { lazy, useEffect } from "react"

import new_this_month from "../assets/json/home/advertisement/new-this-month.json"
import new_this_month_posts from "../assets/json/home/post/new-this-month.json"
import off_20 from "../assets/json/home/advertisement/20-off.json"
import off_20_posts from "../assets/json/home/post/20-off.json"

const Carousel = lazy(() => import("../components/Carousel/Carousel"))
const ProductsAdvertisement = lazy(() => import("../components/ProductsAdvertisement/ProductsAdvertisement"))

const Home = () => {

  const preloadImage = (url: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'image';
    document.head.appendChild(link);
  };

  useEffect(() => {
    document.title = "Home | CrystalGym";
    preloadImage('/images/home/advertisement/new-this-month/desktop/the-rock-compress.webp');
    preloadImage('/images/home/advertisement/new-this-month/new-this-month-1-compress.webp');
  })

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <header>
        <Carousel
          advertisement={new_this_month.advertisement} mobileImages={new_this_month.mobileImages} desktopImages={new_this_month.desktopImages}
        />
      </header>
      <ProductsAdvertisement products={new_this_month_posts} title="New This Month" link="/new-this-month" />
      <Carousel
        advertisement={off_20.advertisement} mobileImages={off_20.mobileImages} desktopImages={off_20.desktopImages}
      />
      <ProductsAdvertisement products={off_20_posts} title="20% Off" link="/20%-off" />
    </main>
  )
}

export default Home;