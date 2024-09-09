import { useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import { CategoryDataInterface} from "../interfaces/CategoryInterfaces";
import '../styles/form.css'
import { ColorDataInterface } from "../interfaces/ColorInterfaces";
import ColorService from "../services/color.service";
import { ClotheDataInterface } from "../interfaces/ClothesInterfaces";

const PostNewClothe = () => {

  const [categories, setCategories] = useState<CategoryDataInterface[] | null>(null);
  const [clotheColors, setClotheColors] = useState<ColorDataInterface[] | null>(null);
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

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await CategoryService.getCategories();
      if (response.code == 200) {
        setCategories(response.data)
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchColors = async () => {
      const response = await ColorService.getColors();
      if (response.code == 200) {
        setClotheColors(response.data)
      }
    };

    fetchColors();
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

  }


  return (
    <>
      <h1>Add New Clothe</h1>
      <form onSubmit={handleSubmit} className="form grid">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleInputChange} />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={handleInputChange} />
        <label htmlFor="category">Category</label>
        <select name="category" onChange={handleInputChange}>
          <option value={-1} key={-1} selected>Select Category</option>
          {categories?.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
        </select>
        <label htmlFor="price">Price</label>
        <input type="text" name="price" onChange={handleInputChange} />
        <label htmlFor="gender">Gender</label>
        <input type="text" name="gender" onChange={handleInputChange} />
        <section>
          <header>
            <h2>Images</h2>
            <button type="button" onClick={() => setColorsCount((prev) => prev + 1)}>+</button>
          </header>
          {Array.from({ length: colorsCount }).map((_, index) => (
            <article key={index}>
              <label htmlFor={`colors[${index}]`}>Color</label>
              <select name={`colors[${index}]`} onChange={(event) => handleInputColorChange(event, index)}>
                <option value={-1} key={-1}>Select Color</option>
                {clotheColors?.map(clotheColor => <option value={clotheColor.id} key={clotheColor.id}>{clotheColor.name}</option>)}
              </select>
              <label htmlFor={`colors[${index}][stock]`}>Stock</label>
              <input type="number" min={0} multiple name={`colors[${index}][stock]`} onChange={(event) => handleInputColorChange(event, index)} />
              <label htmlFor={`colors[${index}][images]`}>Image</label>
              <input type="file" multiple name={`colors[${index}][images]`} onChange={(event) => handleInputImageChange(event, index)} />
            </article>
          ))}
        </section>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
};

export default PostNewClothe;