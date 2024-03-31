import data from "../../../assets/json/shop/clothes.json"

export const SearchResult = () => {
  return (
    <section className="h-screen overflow-y-hidden">
      <ul className="h-full overflow-x-scroll">
        {data.all.map(article => {
          return (
            <li>
              <p>{article.name}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}