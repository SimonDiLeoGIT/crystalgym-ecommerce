interface Image {
  color: string
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
