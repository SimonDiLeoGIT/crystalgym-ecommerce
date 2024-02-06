import { News } from "../../components/News"
import { Posts_Section } from "../../components/post_section/Posts_Section"
import posts from "../../assets/posts.json"

export const Women = () => {
  return (
    <main className="max-w-screen overflow-x-hidden font-roboto">
      <header>
        <News
          news={{
            id: '1',
            image: 'violet-woman',
            title_front: 'WOMEN',
            title_middle: 'CLOTHING',
            title_end: '',
            info: 'Urban and gym clothing.',
            button1_title: 'SHOP WOMEN',
          }}
        />
      </header>
      <Posts_Section posts={posts.posts} title="All Women" />
      <News
        news={{
          id: '1',
          image: 'gym-woman',
          title_front: '20%',
          title_middle: 'OFF',
          title_end: '',
          info: 'Urban and gym clothing.',
          button1_title: 'FEATURED PRODUCTS',
        }}
      />
      <Posts_Section posts={posts.posts} title="" />
    </main>
  )
}