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
    <section>
      <header>
        <h1> {title} </h1>
      </header>
      {clothes.map((clothe) => {
        return (
          <Link to="/">
            <article className="min-w-72 mx-1" key={clothe.id}>
              <figure className="mb-4 h-96">
                <img className="w-full h-5/6 object-cover" src={clothe.image} alt={clothe.name} />
                <figcaption className="mt-2">
                  <h1 className="text-lg font-bold text-nowrap overflow-x-hidden text-ellipsis">{clothe.name}</h1>
                  <p className="text-sm">{clothe.info}</p>
                  <p className="text-sm">${clothe.price}</p>
                </figcaption>
              </figure>
            </article>
          </Link>
        )
      })}
    </section>
  )
}