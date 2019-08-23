import { Action } from "./overrides";

import * as bannersConstants from '../constants/banner'

export class RequestBannersList implements Action {
  readonly type = bannersConstants.REQUEST_BANNERS_LIST
  constructor(public payload = null) { }
}

export class RequestBannersListComplete implements Action {
  readonly type = bannersConstants.REQUEST_BANNERS_LIST_COMPLETE
  constructor(public payload = null) { }
}

export class RequestBannersListError implements Action {
  readonly type = bannersConstants.REQUEST_BANNERS_LIST_ERROR
  constructor(public payload = null) { }
}


export class RequestBanner implements Action {
  readonly type = bannersConstants.REQUEST_BANNER
  constructor(public payload = null) { }
}

export class RequestBannerComplete implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_COMPLETE
  constructor(public payload = null) { }
}

export class RequestBannerError implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_ERROR
  constructor(public payload = null) { }
}


export class RequestBannerUpdate implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_UPDATE
  constructor(public payload = null) { }
}

export class RequestBannerUpdateComplete implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_UPDATE_COMPLETE
  constructor(public payload = null) { }
}

export class RequestBannerUpdateError implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_UPDATE_ERROR
  constructor(public payload = null) { }
}


export class RequestBannerCreate implements Action { 
  readonly type = bannersConstants.REQUEST_BANNER_CREATE
  constructor(public payload = null) { }
}

export class RequestBannerCreateComplete implements Action { 
  readonly type = bannersConstants.REQUEST_BANNER_CREATE_COMPLETE
  constructor(public payload = null) { }
}

export class RequestBannerCreateError implements Action { 
  readonly type = bannersConstants.REQUEST_BANNER_CREATE_ERROR
  constructor(public payload = null) { }
}


export class RequestBannerPresigned implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_PRESIGNED
  constructor(public payload = null) { }
}

export class RequestBannerPresignedComplete implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_PRESIGNED_COMPLETE
  constructor(public payload = null) { }
}

export class RequestBannerPresignedError implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_PRESIGNED_ERROR
  constructor(public payload = null) { }
}


export class RequestBannerUpload implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_UPLOAD
  constructor(public payload = null) { }
}

export class RequestBannerUploadComplete implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_UPLOAD_COMPLETE
  constructor(public payload = null) { }
}

export class RequestBannerUploadError implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_UPLOAD_ERROR
  constructor(public payload = null) { }
}


export class RequestBannerDelete implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_DELETE
  constructor(public payload = null) { }
}

export class RequestBannerDeleteComplete implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_DELETE_COMPLETE
  constructor(public payload = null) { }
}

export class RequestBannerDeleteError implements Action {
  readonly type = bannersConstants.REQUEST_BANNER_DELETE_ERROR
  constructor(public payload = null) { }
}

export type Actions = 
  | RequestBannersList 
  | RequestBannersListComplete
  | RequestBannersListError
  | RequestBanner
  | RequestBannerComplete
  | RequestBannerError
  | RequestBannerUpdate
  | RequestBannerUpdateComplete
  | RequestBannerUpdateError
  | RequestBannerCreate
  | RequestBannerCreateComplete
  | RequestBannerCreateError
  | RequestBannerPresigned
  | RequestBannerPresignedComplete
  | RequestBannerPresignedError
  | RequestBannerUpload
  | RequestBannerUploadComplete
  | RequestBannerUploadError
  | RequestBannerDelete
  | RequestBannerDeleteComplete
  | RequestBannerDeleteError
