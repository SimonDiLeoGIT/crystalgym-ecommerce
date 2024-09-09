import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import left_arrow from '../../assets/icons/carousel/left-arrow.svg'
import right_arrow from '../../assets/icons/carousel/right-arrow.svg'
import { ProductImg } from "../ProductImg/ProductImg";
import { ProductInterface } from "../../interfaces/ProductInterfaces";

type productList = ProductInterface[];

interface Props {
  products: productList
}

export const Products: React.FC<Props> = ({ products }) => {

  const totalArticles = 10
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [data, setData] = useState<productList>(products.slice(currentPage, totalArticles))

  useEffect(() => {
    setData(products.slice(currentPage, (currentPage) + totalArticles))
    setTotalPages(products?.length / totalArticles)
  }, [products, currentPage]);

  useEffect(() => {
    setCurrentPage(0)
  }, [products]);

  interface PageChangeEvent {
    selected: number;
  }

  const handlePageClick = (event: PageChangeEvent) => {
    const next = (event.selected * totalArticles) % products.length;
    setCurrentPage(next)
    setData(products.slice(next, (next) + totalArticles))
    window.scrollTo(0, 0);
  }

  return (
    <section className=" m-auto">
      <section className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
        {
          data?.map((product) => {
            return (
              <article className="shadow-md">
                <ProductImg product={product} />
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
            <img src={right_arrow} className="w-4" alt="Next Page"/>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          previousLabel={
            <img src={left_arrow} className="w-4" alt="Prev Page"/>
          }
          renderOnZeroPageCount={null}
          containerClassName=" flex justify-center hover:cursor-pointer  m-auto"
          pageLinkClassName="p-1 md:p-2"
          pageClassName="p-2 md:p-2 rounded-lg font-semibold -text--color-black hover:-bg--color-very-light-grey hover:opacity-60"
          activeClassName="-bg--color-light-grey-violet -text--color-white hover:-bg--color-light-grey-violet"
          previousClassName="h-8 w-4 md:w-8 flex items-center justify-center -bg--color-light-grey-violet rounded-lg m-auto mr-1 hover:opacity-60"
          nextClassName="h-8 w-4 md:w-8 flex items-center justify-center -bg--color-light-grey-violet rounded-lg m-auto ml-1 hover:opacity-60"
        />
      </footer>
    </section>
  )
}