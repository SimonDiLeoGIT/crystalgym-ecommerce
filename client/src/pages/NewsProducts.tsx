import React, { useEffect } from "react";
import { Products } from "../components/Products/Products";
import { ProductInterface } from "../interfaces/interfaces";

type productList = ProductInterface[]

interface Props {
  title: string,
  products: productList
}


export const NewsProducts: React.FC<Props> = ({ title, products }) => {

  useEffect(() => {
    document.title = "CrystalGym | New";
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="w-11/12 lg:w-10/12 m-auto">
      <header className="py-2">
        <h1 className="font-semibold text-xl md:font-bold md:text-3xl"> {title}</h1>
      </header>
      <Products products={products} />
    </section>
  )
}