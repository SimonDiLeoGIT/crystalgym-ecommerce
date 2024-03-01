
import add_to_bag_icon from "../../assets/icons/nav icons/bag-plus-1122-svgrepo-com.svg"
import like_icon from "../../assets/icons/like-icon.svg"
import { useCart } from "../../hook/useCart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

type clotheList = ProductInterface[];

interface Props {
  clothes: clotheList
}

export const Products: React.FC<Props> = ({ clothes }) => {

  const { addToCart } = useCart()

  const totalArticles = 10
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    setTotalPages(clothes?.length / totalArticles)

  })

  return (
    <section className="grid grid-cols-2 gap-2">
      {
        clothes?.map((clothe) => {
          return (
            <article className="shadow-md">
              <figure>
                <image className=" relative">
                  <Link to={`/product/${clothe.id}/${clothe.colorId}`}>
                    <img className="w-full max-h-48 object-cover" src={clothe.images[0]} alt={clothe.name} />
                  </Link>
                  <button onClick={() => addToCart(clothe)} className="absolute top-2 right-2 -bg--color-white rounded-full p-2"> <img src={add_to_bag_icon} alt="bag icon" className="w-4" />  </button>
                  <button className="absolute bottom-2 right-2 -bg--color-white rounded-full p-2"> <img src={like_icon} alt="like icon" className="w-4" /> </button>
                  {clothe.new &&
                    <span className="absolute bottom-2 left-2 -bg--color-white rounded-2xl px-2 py-1 text-sm font-bold -text--color-black">
                      New
                    </span>
                  }
                </image>
                <figcaption className="mt-1">
                  <h1 className="text-sm font-semibold text-nowrap overflow-x-hidden text-ellipsis">{clothe.name}</h1>
                  <p className="text-sm">{clothe.category}</p>
                  <p className="text-sm">${clothe.price}</p>
                </figcaption>
              </figure>
            </article>
          )
        }
        )
      }
      <footer className='w-screen'>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          // onPageChange={handlePageClick}
          pageRangeDisplayed={0}
          pageCount={totalPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName='flex justify-center'
          pageClassName='w-10'
        />
      </footer>
    </section>
  )
}