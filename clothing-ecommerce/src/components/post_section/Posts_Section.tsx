import { Link } from "react-router-dom"

interface Post {
  id: string,
  image: string,
  title: string,
  info: string,
  price: number,
}

type PostsList = Post[]

interface Props {
  posts: PostsList
  title: string
}

export const Posts_Section: React.FC<Props> = ({ posts, title }) => {


  return (
    <section className="p-2 mb-4">
      <h1 className="font-bold text-xl p-2">{title}</h1>
      <section className="flex overflow-x-auto whitespace-nowrap">
        {posts.map(post => {
          return (
            <Link to="/">
              <article className="min-w-72 mx-1" key={post.id}>
                <figure className="mb-4 h-96">
                  <img className="w-full h-5/6 object-cover" src={post.image} alt={post.title} />
                  <figcaption className="mt-2">
                    <h1 className="text-lg font-bold text-nowrap overflow-x-hidden text-ellipsis">{post.title}</h1>
                    <p className="text-sm">{post.info}</p>
                    <p className="text-sm">${post.price}</p>
                  </figcaption>
                </figure>
              </article>
            </Link>
          )
        })}
      </section>
    </section>
  )
}