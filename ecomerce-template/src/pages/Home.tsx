import home_header_img from "./../assets/Home_images/home_header_img.png"

export const Home = () => {
  return (
    <main className="">
      <header>
        <img src={home_header_img} />
        <h1 className="absolute top-2/4 left-4 mt-20 font-bold text-xl">NEW <span className="text-purple-900">THIS</span> MONTH</h1>
        <h2 className="absolute top-2/4 left-4 mt-28 font-semibold text-sm">Urban and gym clothing.</h2>
        <button>FEATURED PRODUCTS</button>
        <button>NEW PRODUCTS</button>
      </header>
    </main>
  )
}