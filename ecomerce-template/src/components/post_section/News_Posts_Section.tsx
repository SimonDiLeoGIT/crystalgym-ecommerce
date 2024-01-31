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
}

export const News_Posts_Section: React.FC<Props> = ({ posts }) => {


  return (
    <section className="mt-24 ml-4 flex overflow-x-auto whitespace-nowrap">
      {posts.map(post => {
        return (
          <article className="min-w-72 mx-1" key={post.id}>
            <figure className="mb-4 h-96">
              <img className="w-full h-5/6 object-cover" src={post.image} alt={post.title} />
              <figcaption className="mt-2">
                <h1 className="text-lg font-bold">{post.title}</h1>
                <p className="text-sm">{post.info}</p>
                <p className="text-sm">${post.price}</p>
              </figcaption>
            </figure>
          </article>
        )
      })}
    </section>
  )
}