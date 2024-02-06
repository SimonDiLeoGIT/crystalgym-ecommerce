import './../styles/news.css'

interface News {
  id: string,
  image: string,
  title_front: string,
  title_middle: string,
  title_end: string,
  info: string,
  button1_title: string,
}

type NewsType = News

interface Props {
  news: NewsType
}


export const News: React.FC<Props> = ({ news }) => {

  const section_classes = (): string => {
    return "grid place-content-end gap-12 flex-1 " + news.image
  }

  return (
    <section className={section_classes()}>
      <section className="ml-5">
        <h1 className="font-bold text-2xl">{news.title_front}<span className="-text--color-light-grey-violet -bg--color-black rounded-md px-2 mx-2">{news.title_middle}</span> {news.title_end}</h1>
        <h2 className="font-semibold text-sm">{news.info}</h2>
      </section>
      <section className="w-screen text-center">
        <button className=" -bg--color-light-grey-violet font-bold p-4 rounded-full w-11/12 my-2">{news.button1_title}</button>
      </section>
    </section >
  )
}