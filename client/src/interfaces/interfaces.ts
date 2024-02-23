export interface Product {
  id: string,
  name: string,
  category: string,
  sex: string,
  new: boolean,
  image: string,
  price: number
}

export interface CartState {
  productCount: number,
  products: Product[],
  total: number
}