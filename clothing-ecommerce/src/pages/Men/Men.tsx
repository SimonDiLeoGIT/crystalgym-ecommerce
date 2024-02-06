import { News } from "../../components/News"
import { Posts_Section } from "../../components/post_section/Posts_Section"
import t_shirt from "../../assets/json/men/t-shirt.json"
import all_men from "../../assets/json/men/all_men.json"

export const Men = () => {
  return (
    <main className="max-w-screen overflow-x-hidden font-roboto">
      <header>
        <News
          news={{
            id: '1',
            image: 'grey-man',
            title_front: 'MEN',
            title_middle: 'CLOTHING',
            title_end: '',
            info: 'Urban and gym clothing.',
            button1_title: 'FEATURED PRODUCTS',
          }}
        />
      </header>
      <Posts_Section posts={all_men.posts} title="Men Shop" />
      <News
        news={{
          id: '1',
          image: 'green-man',
          title_front: 'MEN',
          title_middle: 'T-SHIRT',
          title_end: '',
          info: 'T-Shirt clothing.',
          button1_title: 'FEATURED PRODUCTS',
        }}
      />
      <Posts_Section posts={t_shirt.posts} title="Men T-Shirt" />
    </main>
  )
}