import { useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import ColorService from "../services/color.service";
import GenderService from "../services/gender.service";
import { CategoryDataInterface } from "../interfaces/CategoryInterfaces";
import { ColorDataInterface } from "../interfaces/ColorInterfaces";
import { GenderDataInterface } from "../interfaces/GenderInterfaces";

const useFetchData = () => {
  const [categories, setCategories] = useState<CategoryDataInterface[] | null>(null);
  const [clotheColors, setClotheColors] = useState<ColorDataInterface[] | null>(null);
  const [genders, setGenders] = useState<GenderDataInterface[] | null>(null);
  
  useEffect(() => {
    fetchCategories();
    fetchColors();
    fetchGenders();
  }, []);

  const fetchCategories = async () => {
    const response = await CategoryService.getCategories();
    if (response.code == 200) setCategories(response.data);
  };

  const fetchColors = async () => {
    const response = await ColorService.getColors();
    if (response.code == 200) setClotheColors(response.data);
  };

  const fetchGenders = async () => {
    const response = await GenderService.getGenders();
    if (response.code == 200) setGenders(response.data);
  };

  return { categories, clotheColors, genders };
};

export default useFetchData