export interface ILink {
  url: string
  data: any
  params: any
}

export interface ILinkParams {
  id: number | string
}

export interface IFullLinkParams extends ILinkParams {
  ad_title: string
  ad_photo_url: string
}
