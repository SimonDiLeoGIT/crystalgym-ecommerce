import { Posts_Section } from "../components/post_section/Posts_Section"
import posts from "../assets/json/posts.json"
import advertisements from "../assets/json/home/advertisements.json"
import './../styles/news.css'
import { Carousel } from "../components/Carousel"

export const Home = () => {
  return (
    <main className="max-w-screen overflow-x-hidden font-roboto">
      <header>
        <Carousel
          advertisements={advertisements}
        />
      </header>
      <Posts_Section posts={posts.posts} title="New This Month" />
      <Posts_Section posts={posts.posts} title="20% Off" />
    </main>
  )
}