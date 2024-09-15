export interface GenderInterface {
  code: number
  data: GenderDataInterface[]
  message: string
}

export interface GenderDataInterface {
  id: number
  name: string
  description: string
}