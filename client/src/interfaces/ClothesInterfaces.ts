export interface ClotheInterface {
  code: number;
  data: ClotheDataInterface;
  message: string;
}

export interface ClotheDataInterface {
  name: string;
  description: string;
  price: number;
  id_gender: number;
  id_category: number;
  colors: ClotheColor[];
}

export interface ClotheColor {
  id_color: number; 
  stock: number;
  images: File[];
}