import { useEffect } from "react";
import clothe_data from '../assets/json/shop/clothes.json'
import { Products } from "../components/Products/Products";
import { useParams } from "react-router-dom";
import { ProductInterface } from "../interfaces/interfaces";


type product = ProductInterface;

const Category = () => {

  const clothes = clothe_data.all

  const { sex } = useParams()
  const { category } = useParams()

  function getClotheList(): product[] {
    const clotheList: product[] = [];
    clothes.map((clothe) => {
      if ((category === clothe.category) && (sex === clothe.sex)) {
        const c: product = clothe
        clotheList.push(c)
      }
    })
    return clotheList
  }

  useEffect(() => {
    document.title = "CrystalGym | Category";
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="w-11/12 lg:w-10/12 m-auto">
      <header className="py-2">
        <h1 className="font-semibold text-xl md:font-bold md:text-3xl"> {category?.toUpperCase()} <span className="-text--color-grey text-sm md:text-lg"> {sex?.toUpperCase()} </span> </h1>
      </header>
      <Products products={getClotheList()} />
    </section>
  )
}

export default Category;