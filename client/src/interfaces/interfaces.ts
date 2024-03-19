
type images = string[]

interface ProductInterface {
  id: number,
  name: string,
  category: string,
  sex: string,
  new: boolean,
  off: boolean,
  accessory: boolean,
  colorId: number,
  colorName: string,
  images: images,
  price: number
}
