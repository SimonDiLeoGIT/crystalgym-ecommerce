interface Color {
  colorId: string
  colorName: string
}

type colorType = Color

interface Image {
  color: colorType
  src: string[]
}

type images = Image[]

interface ProductInterface {
  id: string,
  name: string,
  category: string,
  sex: string,
  new: boolean,
  image: images,
  price: number
}
