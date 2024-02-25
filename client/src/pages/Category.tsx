import React, { useEffect } from "react";
import clothe_data from '../assets/json/shop/clothes.json'
import { Products } from "../components/Products/Products";


interface Props {
  title: string,
  category: string,
  sex: string
}

type product = ProductInterface;

export const Category: React.FC<Props> = ({ title, category, sex }) => {

  const clothes = clothe_data.all

  function getClotheList(): product[] {
    const clotheList: product[] = [];
    clothes.map((clothe) => {
      if ((category === clothe.category || category === "*") && (sex === "*" || sex === clothe.sex)) {
        const c: product = clothe
        clotheList.push(c)
      }
    })
    return clotheList
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="p-3">
      <header className="py-2">
        <h1 className="font-semibold text-xl"> {title} <span className="-text--color-grey text-sm"> {sex.toUpperCase()} </span> </h1>
      </header>
      <Products clothes={getClotheList()} />
    </section>
  )
}