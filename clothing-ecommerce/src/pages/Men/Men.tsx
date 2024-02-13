import { Posts_Section } from "../../components/post_section/Posts_Section"
import gym_clothing from "../../assets/json/men/advertisement/gym-clothing.json"
import gym_clothing_post from "../../assets/json/men/post/gym-clothing.json"
import hoodies from "../../assets/json/men/advertisement/hoodies.json"
import hoodies_post from "../../assets/json/men/post/hoodies.json"

import { Carousel } from "../../components/Carousel"

export const Men = () => {
  return (
    <main className="max-w-screen overflow-x-hidden font-roboto">
      <header>
        <Carousel
          advertisement={gym_clothing.advertisement} images={gym_clothing.images}
        />
      </header>
      <Posts_Section posts={gym_clothing_post.posts} title="Gym Clothing" />
      <Carousel
        advertisement={hoodies.advertisement} images={hoodies.images}
      />
      <Posts_Section posts={hoodies_post.posts} title="All Hoodies" />
    </main>
  )
}