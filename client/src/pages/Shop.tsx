import React from "react";
import { Link } from "react-router-dom";


interface clothe {
  id: string,
  name: string,
  info: string,
  image: string,
  price: number
}

type clothesList = clothe[];

interface Props {
  title: string
  clothes: clothesList
}

export const Shop: React.FC<Props> = ({ title, clothes }) => {

  return (
    <section className="p-3">
      <header className="py-2">
        <h1 className="font-semibold text-xl"> {title} </h1>
      </header>
      <section className="grid grid-cols-2 gap-2">
        {clothes.map((clothe) => {
          return (
            <Link to="/">
              <article className="" key={clothe.id}>
                <figure className="relative">
                  <img className="w-full max-h-48 object-cover" src={clothe.image} alt={clothe.name} />
                  <figcaption className="mt-1">
                    <h1 className="text-sm font-semibold text-nowrap overflow-x-hidden text-ellipsis">{clothe.name}</h1>
                    <p className="text-sm">{clothe.info}</p>
                    <p className="text-sm">${clothe.price}</p>
                  </figcaption>
                </figure>

              </article>
            </Link>
          )
        })}
      </section>
    </section>
  )
}