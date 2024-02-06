import { News } from "../../components/News"
import { Posts_Section } from "../../components/post_section/Posts_Section"
import all_accessories from "../../assets/json/accessories/accessories.json"
import bag from "../../assets/json/accessories/bag.json"

export const Accessories = () => {
  return (
    <main className="max-w-screen overflow-x-hidden font-roboto">
      <header>
        <News
          news={{
            id: '1',
            image: 'accessories',
            title_front: 'GYM',
            title_middle: 'ACCESSORIES',
            title_end: '',
            info: 'Have a great workout with our accessories.',
            button1_title: 'ALL ACCESSORIES'
          }}
        />
      </header>
      <Posts_Section posts={all_accessories.posts} title="All Accessories" />
      <News
        news={{
          id: '1',
          image: 'bag-accessor',
          title_front: 'GYM',
          title_middle: 'BAG',
          title_end: '',
          info: 'Urban and gym clothing.',
          button1_title: 'BAG SHOP',
        }}
      />
      <Posts_Section posts={bag.posts} title="Bag" />
    </main>
  )
}