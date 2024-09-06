export interface ClothesInterface {
  id?: number,
  name: string,
  description: string,
  id_category: number,
  id_gender: number,
  price?: number,
  colors: ClotheColor[],
}

export interface ClotheColor {
  color_id: number
  images: ClotheImage[]
  stock: number
  price?: number
}

export interface ClotheImage {
  image: File
}