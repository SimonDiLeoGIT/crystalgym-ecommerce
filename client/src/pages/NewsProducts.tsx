import React, { useEffect, useState } from "react";
import { Products } from "../components/Products/Products";
import { ProductInterface } from "../interfaces/interfaces";
import { useParams } from "react-router-dom";

interface Props {
  // title: string
}

const NewsProducts: React.FC<Props> = () => {

  const [products, setProducts] = useState<ProductInterface[] | undefined>();
  const [title, setTitle] = useState<string>('')

  const {type} = useParams();

  useEffect(() => {
    document.title = "New | CrystalGym";
  })

  useEffect(() => {
    const param = type?.replace(/-/g, ' ');
    const upperCaseParam = param?.toUpperCase();
    upperCaseParam && setTitle(upperCaseParam);
  }, [type])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if(type === 'accessories'){
          const { default: accessories } = await import("../assets/json/shop/accessories.json");
          setProducts(accessories)
        }

        if (type === 'men') {
          const { default: menGym } = await import("../assets/json/men/advertisement/gym-clothes-products.json");
          setProducts(menGym)
        } 
        
        if (type === 'women') {
          const { default: womenGym } = await import("../assets/json/women/advertisement/gym-clothes-products.json");
          setProducts(womenGym)
        } 

        if (type === 'new-this-month') {
          const { default: newProducts } = await import("../assets/json/home/advertisement/new-this-month-products.json");
          setProducts(newProducts)
        }
        
        if (type === '20%-off') {
          const { default: newProducts } = await import("../assets/json/home/advertisement/20-off-products.json");
          setProducts(newProducts)
        }

      } catch (error) {
        console.error('Failed to load products', error);
      }
    };

    loadProducts();
  }, [type]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="w-11/12 lg:w-10/12 m-auto">
      <header className="py-2">
        <h1 className="font-semibold text-xl md:font-bold md:text-3xl"> {title}</h1>
      </header>
      {products &&
        <Products products={products} />
      }
    </section>
  )
}

export default NewsProducts;