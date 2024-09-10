import { useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import { CategoryDataInterface} from "../interfaces/CategoryInterfaces";
import { ColorDataInterface } from "../interfaces/ColorInterfaces";
import ColorService from "../services/color.service";
import { ClotheDataInterface } from "../interfaces/ClothesInterfaces";
import GenderService from "../services/gender.service";
import { GenderDataInterface } from "../interfaces/GenderInterfaces";
import ClotheService from "../services/clothe.service";

import '../styles/form.css';

const PostNewClothe = () => {

  const [categories, setCategories] = useState<CategoryDataInterface[] | null>(null);
  const [clotheColors, setClotheColors] = useState<ColorDataInterface[] | null>(null);
  const [genders, setGenders] = useState<GenderDataInterface[] | null>(null);
  const [colorsCount, setColorsCount] = useState<number>(0);

  const [formData, setFormData] = useState<ClotheDataInterface>({
    name: "",
    description: "",
    price: -1,
    id_category: -1,
    id_gender: -1,
    colors: []
  })

  useEffect(() => {
    document.title = "Post New Clothe | CrystalGym";
  })

  // Get categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await CategoryService.getCategories();
      if (response.code == 200) {
        setCategories(response.data)
      }
    };

    fetchCategories();
  }, []);

  // Get colors
  useEffect(() => {
    const fetchColors = async () => {
      const response = await ColorService.getColors();
      if (response.code == 200) {
        setClotheColors(response.data)
      }
    };

    fetchColors();
  }, []);

  // Get genders
  useEffect(() => {
    const fetchGenders = async () => {
      const response = await GenderService.getGenders();
      if (response.code == 200) {
        setGenders(response.data)
      }
    };

    fetchGenders();
  }, []);
    
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
    console.log(formData)
  }

  const handleInputColorChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    
    const { name, value } = event.target;
    const updateColors = [...formData.colors]

    if (name.includes('stock')) {
      updateColors[index] = {
        ...updateColors[index],
        stock: parseInt(value, 10)
      };
    } else {
      updateColors[index] = {
        ...updateColors[index],
        id_color: parseInt(value, 10)
      };
    }
    
    setFormData({
      ...formData,
      colors: updateColors
    })
    console.log(formData)
  }

  const handleInputImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {

    const { files } = event.target;
    
    const updateColors = [...formData.colors]

    if (files) {
      updateColors[index] = {
        ...updateColors[index],
        images: [...files]
      }
    }
    setFormData({
      ...formData,
      colors: updateColors
    })
    console.log(formData)
  }

  function validateFormData(fd: FormData) {
    let isValid = true;
    const priceString = fd.get("price") as string; 
    const price = parseInt(priceString, 10);
    if (price < 0) {
      isValid = false;
    }
    return isValid;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('formData: ', formData)
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("description", formData.description);
    submitData.append("id_category", formData.id_category.toString());
    submitData.append("price", formData.price.toString());
    submitData.append("id_gender", formData.id_gender.toString());

    formData.colors.forEach((color, index) => {
      submitData.append(`colors[${index}][id_color]`, color.id_color.toString());
      submitData.append(`colors[${index}][stock]`, color.stock.toString());
      color.images.forEach((image, imgIndex) => {
        submitData.append(`colors[${index}][images][${imgIndex}]`, image);
      });
    });

    if (!validateFormData(submitData)) {
      console.log('Invalid form data');
      return;
    }

    const response = await ClotheService.postClothe(submitData);
    if (response.code == 201) {
      console.log(response.data);
    }
  }


  return (
    <section className="w-11/12 lg:w-10/12 m-auto">
      <form onSubmit={handleSubmit} className="form grid p-4 max-w-3xl m-auto">
        <legend className="w-9/12 m-auto font-semibold">Add New Clothe</legend>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleInputChange} required/>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={handleInputChange} required/>
        <label htmlFor="id_category">Category</label>
        <select name="id_category" onChange={handleInputChange}>
          <option value={-1} key={-1} selected>Select Category</option>
          {categories?.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
        </select>
        <label htmlFor="price">Price</label>
        <input type="text" name="price" onChange={handleInputChange} required/>
        <label htmlFor="id_gender">Gender</label>
        {genders?.map(gender => 
          <section className="w-9/12 m-auto">
            <input className="mr-2" type="radio" name="id_gender" value={gender.id} key={gender.id} onChange={handleInputChange} required/>
            <label className="" htmlFor="id_gender">{gender.name}</label>
          </section>
        )}
        <section className="">
          <header className="grid grid-cols-2 w-9/12 m-auto font-bold -text--color-black">
            <h2 className="m-auto ml-0">Colors</h2>
            <button className="-bg--color-black -text--color-grey rounded-full h-10 w-28 m-auto mr-0" type="button" onClick={() => setColorsCount((prev) => prev + 1)}>Add Color</button>
          </header>
          {Array.from({ length: colorsCount }).map((_, index) => (
            <article key={index} className="grid">
              <label htmlFor={`colors[${index}]`}>Color</label>
              <select name={`colors[${index}]`} onChange={(event) => handleInputColorChange(event, index)}>
                <option value={-1} key={-1}>Select Color</option>
                {clotheColors?.map(clotheColor => <option value={clotheColor.id} key={clotheColor.id}>{clotheColor.name}</option>)}
              </select>
              <label htmlFor={`colors[${index}][stock]`}>Stock</label>
              <input type="number" min={0} multiple name={`colors[${index}][stock]`} onChange={(event) => handleInputColorChange(event, index)} required/>
              <label htmlFor={`colors[${index}][images]`}>Images</label>
              <input className="" type="file" multiple name={`colors[${index}][images]`} onChange={(event) => handleInputImageChange(event, index)} required/>
            </article>
          ))}
        </section>
        <input className="w-9/12 m-auto mt-4 p-2 -bg--color-black -text--color-light-grey-violet font-semibold rounded-lg hover:scale-105 transition-transform duration-150 hover:cursor-pointer" type="submit" value="Submit" required/>
      </form>
    </section>
  )
};

export default PostNewClothe;