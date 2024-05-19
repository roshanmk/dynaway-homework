export interface Asset {
  id: string
  type: string
  name: string
  locationId: string
  locationName: string
  image?: string
}

export interface ResponseValue {
  ok: boolean,
  data: Asset[]
}
