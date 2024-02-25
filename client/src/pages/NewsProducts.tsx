import React, { useEffect } from "react";
import { Products } from "../components/Products/Products";

type productList = ProductInterface[]

interface Props {
  title: string,
  products: productList
}


export const NewsProducts: React.FC<Props> = ({ title, products }) => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="p-3">
      <header className="py-2">
        <h1 className="font-semibold text-xl"> {title} <span className="-text--color-grey text-sm"> * </span> </h1>
      </header>
      <Products clothes={products} />
    </section>
  )
}