export interface Banner {
  name: string
  enabled: boolean
  country_code: string
  image_url_500: string
  image_url_1000: string
  image_url_2500: string
  dynamic_link: string
  start: string // ISO datetime
  end: string // ISO datetime
  id?: number
  creation?: string // ISO datetime
  last_update?: string // ISO datetime
}

export interface BannerPresigned {
  url: string
}

export interface BannerFilterParams {
  sort_by?: string
  is_enabed?: string // true / false as strings (?); probably any value will be evaluated as true
  name?: string
  id?: string
  country_code?: string
}

export interface IImageData {
  contentType: string
  file?: any
  name: string
  width?: number
  height?: number
}

export interface IImgSize {
  small: Array<number>
  medium: Array<number>
  full: Array<number>
}
