import { Link } from "react-router-dom"
import data from "../../../assets/json/shop/clothes.json"
import { ProductImg } from "../../ProductImg/ProductImg"

interface props {
  input: string
}

export const SearchResult: React.FC<props> = ({ input }) => {

  const categories = ['t-shirt', 'top', 'hoodie', 'jogger', 'short', 'cap', 'belt', 'bag']

  return (
    <section className="h-full overflow-y-auto mx-4 -text--color-black">
      {input !== '' &&
        <div className="">
          <div>
            <h1 className="font-bold font-roboto">CATEGORY</h1>
            <ul className="m-1">
              {categories.map(category => {
                const subName = category.slice(0, input.length)
                if (subName.toUpperCase() === input.toUpperCase()) {
                  return (
                    <li>
                      <Link to="/" className="block"><p className="font-bold -text--color-grey">{category.toUpperCase()}</p></Link>
                      <ul className="grid grid-cols-2 gap-4">
                        {data.all.map(article => {
                          if (article.category.toUpperCase() === category.toUpperCase()) {
                            return (
                              <li className="p-1">
                                <ProductImg product={article} />
                              </li>
                            )
                          }
                        })}
                      </ul>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
          <div>
            <h1 className="font-bold font-roboto">CLOTHES</h1>
            <ul className="m-1 mb-24 grid grid-cols-2 gap-4">
              {data.all.map(article => {
                const subName = article.name.slice(0, input.length)
                if (subName.toUpperCase() === input.toUpperCase()) {
                  return (
                    <li>
                      <ProductImg product={article} />
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </div>
      }
    </section >
  )
}