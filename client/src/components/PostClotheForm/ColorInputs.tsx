import { ClotheDataInterface } from "../../interfaces/ClothesInterfaces";
import { ColorDataInterface } from "../../interfaces/ColorInterfaces";

import trash from "../../assets/icons/nav icons/trash-slash-alt-svgrepo-com.svg";

interface Props {
  handleDeleteColor: (index: number) => void;
  clotheColors: ColorDataInterface[] | null;
  formData: ClotheDataInterface;
  setFormData: React.Dispatch<React.SetStateAction<ClotheDataInterface>>
}

const ColorInputs: React.FC<Props> = ({handleDeleteColor, clotheColors, formData, setFormData }) => {

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

  return (
    formData.colors.map((color,index) => (
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
    ))
  )
}

export default ColorInputs