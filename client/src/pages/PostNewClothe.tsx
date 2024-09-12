import { lazy, useEffect, useState } from "react";
import { ClotheDataInterface } from "../interfaces/ClothesInterfaces";
import ClotheService from "../services/clothe.service";

import '../styles/form.css';

import { UserData } from "../interfaces/UserInterface";
import { useUser } from "../hook/useUser";
import ErrorMessage from "../components/ErrorMessage";
import { ErrorInterface } from "../interfaces/ErrorInterface";
import Message from "../components/Message";
import { BounceLoader } from "react-spinners";
import useFetchData from "../hook/useFetchClotheData";

const Login = lazy(() => import("./Login"))
const ColorInputs = lazy(() => import("../components/PostClotheForm/ColorInputs"))

const PostNewClothe = () => {

  const [message, setMessage] = useState<string>('');
  const [visibleMessage, setVisibleMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const [submiting, setSubmiting] = useState(false);


  const { getUser } = useUser();
  const { categories, clotheColors, genders } = useFetchData();

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
    };

    fetchUser();
  }, [ getUser ]);

  useEffect(() => {
    if (categories && clotheColors && genders) setLoading(false);
  }, [categories, clotheColors, genders]);

  if (loading) {
    return <div className="h-screen">Loading...</div>;
  }

  if (!user || user.id_role != 1) {
    return <Login />;
  }

  const resetFormData = () => {
    setFormData({
      name: "",
      description: "",
      price: 0.0,
      id_category: -1,
      id_gender: formData.id_gender,
      colors: []
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  function validatePrice(input: string) {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    return regex.test(input) && parseFloat(input) > 0;
  }

  function validateData() {
    if (formData.colors.length === 0) {
      handleViewErrorMessage("You must select at least one color");
      return false
    } else {
      for (const color of formData.colors) {
        if (color.id_color === -1) {
          handleViewErrorMessage("There are colors that you have not selected");
          return false
        }
        if (color.images.length === 0) {
          handleViewErrorMessage("You must add at least one image in your color");
          return false
        }
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
        setSubmiting(true)
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
        if (response.code === 201) {
          handleViewMessage(response.message)
          resetFormData()
        } else {
          handleViewErrorMessage(response.message);
        }
      } catch (error) {
        const apiError = error as ErrorInterface
        handleViewErrorMessage(apiError.message)
      }
      setSubmiting(false)
    }
  }

  const handleViewErrorMessage = (message: string) => {
    setErrorMessage(message);
    setVisibleErrorMessage(true);
  }
  
  const handleViewMessage = (message: string) => {
    setMessage(message);
    setVisibleMessage(true);
  }

  const handleAddColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, { id_color: -1, stock: 0, images: [] }] });
  }

  const handleDeleteColor = (index: number) => {
    const updatedColors = [...formData.colors];
    updatedColors.splice(index, 1);
    setFormData({ ...formData, colors: updatedColors });
  }
  
  return (
    <section className="w-11/12 lg:w-10/12 m-auto">
      <Message message={message} visible={visibleMessage} setVisible={setVisibleMessage} />
      <ErrorMessage message={errorMessage} visible={visibleErrorMessage} setVisible={setVisibleErrorMessage} />
      <form onSubmit={handleSubmit} className="form p-4 max-w-3xl m-auto">
        <fieldset disabled={submiting} className="grid">
          <legend className="w-9/12 m-auto font-semibold">Add New Clothe</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} required/>
          <label htmlFor="id_category">Category</label>
          <select name="id_category" value={formData.id_category} onChange={handleInputChange}>
            <option value={-1} key={-1} selected>Select Category</option>
            {categories?.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
          </select>
          <label htmlFor="price">Price</label>
          <input type="text" name="price" value={formData.price} onChange={handleInputChange} required/>
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
            <ColorInputs handleDeleteColor={handleDeleteColor} clotheColors={clotheColors} formData={formData} setFormData={setFormData}/>
          </section>
          {
            submiting ?
            <BounceLoader
            />
            :
            <input className="w-9/12 m-auto mt-4 p-2 -bg--color-black -text--color-light-grey-violet font-semibold rounded-lg hover:scale-105 duration-150 hover:cursor-pointer" type="submit" value="Submit" required/>
          }
        </fieldset>
      </form>
    </section>
  )
};

export default PostNewClothe;