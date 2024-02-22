import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import clothe_data from '../assets/json/shop/clothes.json'
import bag_icon from "../assets/icons/nav icons/bag-shopping.svg"
import like_icon from "../assets/icons/like-icon.svg"


interface Props {
  title: string,
  category: string,
  sex: string
}


export const Category: React.FC<Props> = ({ title, category, sex }) => {

  const clothes = clothe_data.all

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="p-3">
      <header className="py-2">
        <h1 className="font-semibold text-xl"> {title} <span className="-text--color-grey text-sm"> {sex.toUpperCase()} </span> </h1>
      </header>
      <section className="grid grid-cols-2 gap-2">
        {clothes.map((clothe) => {
          if ((category === clothe.category || category === "*") && (sex === "*" || sex === clothe.sex)) {
            return (
              <Link to="/">
                <article className="shadow-md" key={clothe.id}>
                  <figure>
                    <image className=" relative">
                      <img className="w-full max-h-48 object-cover" src={clothe.image} alt={clothe.name} />
                      <button className="absolute top-2 right-2 -bg--color-light-grey-violet rounded-full p-2"> <img src={bag_icon} alt="bag icon" className="w-4" /> </button>
                      <button className="absolute bottom-2 right-2 -bg--color-light-grey-violet rounded-full p-2"> <img src={like_icon} alt="like icon" className="w-4" /> </button>
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
              </Link>
            )
          }
        })}
      </section>
    </section>
  )
}