
type images = string[]

interface ProductInterface {
  id: number,
  name: string,
  category: string,
  sex: string,
  new: boolean,
  off: boolean,
  colorId: number,
  colorName: string,
  images: images,
  price: number
}
