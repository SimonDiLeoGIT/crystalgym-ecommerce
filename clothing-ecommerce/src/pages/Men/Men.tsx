import { News } from "../../components/News"
import { Posts_Section } from "../../components/post_section/Posts_Section"
import posts from "../../assets/posts.json"

export const Men = () => {
  return (
    <main className="max-w-screen overflow-x-hidden font-roboto">
      <header>
        <News
          news={{
            id: '1',
            image: 'grey-man',
            title_front: 'WOMEN',
            title_middle: '',
            title_end: 'CLOTHING',
            info: 'Urban and gym clothing.',
            button1_title: 'FEATURED PRODUCTS',
            button2_title: 'NEW PRODUCTS',
          }}
        />
      </header>
      <Posts_Section posts={posts.posts} />
      <News
        news={{
          id: '1',
          image: 'green-man',
          title_front: '20%',
          title_middle: '',
          title_end: 'OFF',
          info: 'Urban and gym clothing.',
          button1_title: 'FEATURED PRODUCTS',
          button2_title: 'NEW PRODUCTS',
        }}
      />
      <Posts_Section posts={posts.posts} />
    </main>
  )
}