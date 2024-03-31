import { Link } from "react-router-dom"
import data from "../../../assets/json/shop/clothes.json"

interface props {
  input: string
}

export const SearchResult: React.FC<props> = ({ input }) => {

  const categories = ['t-shirt', 'top', 'hoodie', 'jogger', 'short', 'caps', 'belts', 'bags']

  return (
    <section className="h-full overflow-y-auto">
      {input !== '' &&
        <>
          <div>
            <h1>CATEGORY</h1>
            <ul className="mx-4">
              {categories.map(category => {
                const subName = category.slice(0, input.length)
                if (subName.toUpperCase() === input.toUpperCase()) {
                  return (
                    <li>
                      <Link to="/" className="block"><p>{category.toUpperCase()}</p></Link>
                    </li>
                  )
                }
              })}
              <ul className="mx-4">
                {data.all.map(article => {
                  const subName = article.category.slice(0, input.length)
                  if (subName.toUpperCase() === input.toUpperCase()) {
                    return (
                      <li>
                        <Link to="/" className="block"><p>{article.name}</p></Link>
                      </li>
                    )
                  }
                })}
              </ul>
            </ul>
          </div>
          <div>
            <h1>CLOTHES</h1>
            <ul className="mx-4 mb-24">
              {data.all.map(article => {
                const subName = article.name.slice(0, input.length)
                if (subName.toUpperCase() === input.toUpperCase()) {
                  return (
                    <li>
                      <Link to="/" className="block"><p>{article.name}</p></Link>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </>
      }
    </section >
  )
}