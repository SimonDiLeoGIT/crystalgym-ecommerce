import home_header_img from "./../assets/Home_images/home_header_img.png"

export const Home = () => {
  return (
    <section className="">
      <header>
        <img src={home_header_img} />
        <h1 className="absolute top-2/4 left-4 mt-20 font-bold text-xl">NEW <span className="-text--color-dark-violet">THIS</span> MONTH</h1>
        <h2 className="absolute top-2/4 left-4 mt-28 font-semibold text-sm">Urban and gym clothing.</h2>
        <section className="absolute w-screen top-3/4 text-center">
          <button className="font-roboto -bg--color-light-grey-violet font-bold p-4 rounded-full w-5/6 my-2">FEATURED PRODUCTS</button>
          <button className="font-roboto -bg--color-black -text--color-light-grey-violet font-bold p-4 rounded-full w-5/6 my-2">NEW PRODUCTS</button>
        </section>
      </header>

    </section>
  )
}