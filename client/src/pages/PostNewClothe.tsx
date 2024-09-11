import { lazy, useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import { CategoryDataInterface} from "../interfaces/CategoryInterfaces";
import { ColorDataInterface } from "../interfaces/ColorInterfaces";
import ColorService from "../services/color.service";
import { ClotheDataInterface } from "../interfaces/ClothesInterfaces";
import GenderService from "../services/gender.service";
import { GenderDataInterface } from "../interfaces/GenderInterfaces";
import ClotheService from "../services/clothe.service";

import '../styles/form.css';
import trash from "../assets/icons/nav icons/trash-slash-alt-svgrepo-com.svg";

import { UserData } from "../interfaces/UserInterface";
import { useUser } from "../hook/useUser";
import ErrorMessage from "../components/ErrorMessage";
import { ErrorInterface } from "../interfaces/ErrorInterface";

const Login = lazy(() => import("./Login"))

const PostNewClothe = () => {

  const [categories, setCategories] = useState<CategoryDataInterface[] | null>(null);
  const [clotheColors, setClotheColors] = useState<ColorDataInterface[] | null>(null);
  const [genders, setGenders] = useState<GenderDataInterface[] | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleMessage, setVisibleMessage] = useState<boolean>(false);

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const { getUser } = useUser();

  const [formData, setFormData] = useState<ClotheDataInterface>({
    name: "",
    description: "",
    price: 0.0,
    id_category: -1,
    id_gender: -1,
    colors: []
  })

  useEffect(() => {
    document.title = "Post New Clothe | CrystalGym";
  })

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
      setLoading(false);
    };

    fetchUser();
  }, [ getUser ]);

  // Get categories / colors / genders
  useEffect(() => {
    fetchCategories();
    fetchColors();
    fetchGenders();
  }, []);
  
  useEffect(() => {
    if (categories && clotheColors && genders) setLoading(false);
  }, [categories, clotheColors, genders]);

  const fetchCategories = async () => {
    const response = await CategoryService.getCategories();
    if (response.code == 200) {
      setCategories(response.data)
    }
  };

  const fetchColors = async () => {
    const response = await ColorService.getColors();
    if (response.code == 200) {
      setClotheColors(response.data)
    }
  };
  
  const fetchGenders = async () => {
    const response = await GenderService.getGenders();
    if (response.code == 200) {
      setGenders(response.data)
    }
  };

  if (loading) {
    return <div className="h-screen">Loading...</div>;
  }

  if (!user || user.id_role != 1) {
    return <Login />;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleInputColorChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value } = event.target;
    const updatedColors = [...formData.colors];
    updatedColors[index] = {
      ...updatedColors[index],
      [name === "stock" ? "stock" : "id_color"]: parseInt(value, 10),
    };
    setFormData({ ...formData, colors: updatedColors });
  };

  const handleInputImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {

    const { files } = event.target;
    
    const updateColors = [...formData.colors]

    files && (updateColors[index] = {
      ...updateColors[index],
      images: [...updateColors[index].images, ...Array.from(files)]
    })

    setFormData({
      ...formData,
      colors: updateColors
    })
  }

  function validatePrice(input: string) {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    return regex.test(input) && parseFloat(input) > 0;
  }

  function validateData() { 
    for (const color of formData.colors) {
      console.log(color)
      if (color.id_color === -1) {
        handleViewErrorMessage("You must select at least one color");
        return false
      }
      if (color.images.length === 0) {
        handleViewErrorMessage("You must add at least one image in your color");
        return false
      }
    }
  
    return formData.name.length > 0 &&
           formData.description.length > 0 &&
           formData.id_category > -1 &&
           formData.id_gender > -1 &&
           formData.price > 0;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validatePrice(formData.price.toString())) {
      handleViewErrorMessage("Price must be a number greater than 0");
      return;
    }
    
    if (validateData()){  
        setLoading(true)
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
      
      try {
        const response = await ClotheService.postClothe(submitData);
        response.code === 201 ? window.location.reload() : handleViewErrorMessage(response.message);
      } catch (error) {
        setLoading(false)
        const apiError = error as ErrorInterface
        handleViewErrorMessage(apiError.message)
      }
    }
  }

  const handleViewErrorMessage = (message: string) => {
    setErrorMessage(message);
    setVisibleMessage(true);
  }

  const handleAddColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, { id_color: -1, stock: 0, images: [] }] });
  }

  const handleDeleteColor = (index: number) => {
    console.log(index)
    const updatedColors = [...formData.colors];
    console.log(updatedColors)
    updatedColors.splice(index, 1);
    console.log(updatedColors)
    setFormData({ ...formData, colors: updatedColors });
  }
  
  return (
    <section className="w-11/12 lg:w-10/12 m-auto">
      <ErrorMessage message={errorMessage} visible={visibleMessage} setVisible={setVisibleMessage} />
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
            <label className="" htmlFor="id_gender">{gender.description}</label>
          </section>
        )}
        <section className="">
          <header className="grid grid-cols-2 w-9/12 m-auto font-bold -text--color-black">
            <h2 className="m-auto ml-0">Colors</h2>
            <button className="-bg--color-black -text--color-grey rounded-full h-10 w-28 m-auto mr-0 hover:scale-105 duration-150" type="button" onClick={handleAddColor}>Add Color</button>
          </header>
          {formData.colors.map((color,index) => (
            <article key={index} className="grid my-4">
              <header className="grid grid-cols-2 w-9/12 m-auto font-semibold -text--color-black">
                <h3>Color {index + 1}</h3>
                <button className="rounded-full m-auto mr-0 hover:opacity-80" type="button" onClick={() => handleDeleteColor(index)}>
                  <img src={trash} alt="Trash" className="w-6 m-auto" />
                </button>
              </header>
              <label htmlFor='id_color'>Color</label>
              <select name='id_color' onChange={(event) => handleInputColorChange(event, index)}>
                <option value={-1} key={-1}>Select Color</option>
                {clotheColors?.map(clotheColor => <option selected={clotheColor.id === color.id_color} value={clotheColor.id} key={clotheColor.id}>{clotheColor.name}</option>)}
              </select>
              <label htmlFor='stock'>Stock</label>
              <input type="number" min={0} multiple name='stock' value={color.stock} onChange={(event) => handleInputColorChange(event, index)} required/>
              <label htmlFor={`colors[${index}][images]`}>Images</label>
              <input className="" type="file" multiple name={`colors[${index}][images]`} onChange={(event) => handleInputImageChange(event, index)} required/>
            </article>
          ))}
        </section>
        <input className="w-9/12 m-auto mt-4 p-2 -bg--color-black -text--color-light-grey-violet font-semibold rounded-lg hover:scale-105 duration-150 hover:cursor-pointer" type="submit" value="Submit" required/>
      </form>
    </section>
  )
};

export default PostNewClothe;