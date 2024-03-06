
import add_to_bag_icon from "../../assets/icons/nav icons/bag-plus-1122-svgrepo-com.svg"
import like_icon from "../../assets/icons/like-icon.svg"
import { useCart } from "../../hook/useCart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import left_arrow from '../../assets/icons/carousel/left-arrow.svg'
import right_arrow from '../../assets/icons/carousel/right-arrow.svg'

type clotheList = ProductInterface[];

interface Props {
  clothes: clotheList
}

export const Products: React.FC<Props> = ({ clothes }) => {

  const { addToCart } = useCart()

  const totalArticles = 10
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [data, setData] = useState<clotheList>(clothes.slice(currentPage, totalArticles))

  useEffect(() => {
    setTotalPages(clothes?.length / totalArticles)
  })

  const handlePageClick = (event) => {

    const newOffset = (event.selected * totalArticles) % clothes.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    // setItemOffset(newOffset);
    const next = (event.selected * totalArticles) % clothes.length;
    setCurrentPage(next)
    setData(clothes.slice(next, (next) + totalArticles))
    window.scrollTo(0, 0);
  }

  return (
    <section className="w-11/12 m-auto  ">
      <section className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {
          data?.map((clothe) => {
            return (
              <article className="shadow-md">
                <figure>
                  <image className="relative">
                    <Link to={`/product/${clothe.id}/${clothe.colorId}`}>
                      <img className="w-full object-cover" src={clothe.images[0]} alt={clothe.name} />
                    </Link>
                    <button onClick={() => addToCart(clothe)} className="absolute top-2 right-2 -bg--color-white rounded-full p-2"> <img src={add_to_bag_icon} alt="bag icon" className="w-4" />  </button>
                    <button className="absolute bottom-2 right-2 -bg--color-white rounded-full p-2"> <img src={like_icon} alt="like icon" className="w-4" /> </button>
                    {clothe.new &&
                      <span className="absolute bottom-2 left-2 -bg--color-white rounded-2xl px-2 py-1 text-sm font-bold -text--color-black">
                        New
                      </span>
                    }
                  </image>
                  <figcaption className="p-4">
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
      </section>
      <footer className='w-full mt-6'>
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <img src={right_arrow} />
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalPages}
          previousLabel={
            <img src={left_arrow} />
          }
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center hover:cursor-pointer"
          pageLinkClassName=" p-2"
          pageClassName="p-2 rounded-lg font-semibold -text--color-black hover:-bg--color-very-light-grey hover:opacity-60"
          activeClassName="-bg--color-light-grey-violet -text--color-white hover:-bg--color-light-grey-violet"
          previousClassName="text-center h-6 w-6 -bg--color-light-grey-violet rounded-full m-auto hover:opacity-60"
          nextClassName="text-center h-6 w-6 -bg--color-light-grey-violet rounded-full m-auto hover:opacity-60"
        />
      </footer>
    </section>
  )
}