interface Post {
  id: string,
  image: string,
  title: string,
  info: string,
  price: DoubleRange,
}

type PostsList = Post[]

interface Props {
  posts: PostsList
}

export const News_Posts_Section: React.FC<Props> = ({ posts }) => {
  return (
    <section>
      {posts.map(post => {
        return (
          <article key={post.id}>
            {post.title}
          </article>
        )
      })}
    </section>
  )
}