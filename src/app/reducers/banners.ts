import * as bannersActions from '../actions/banners'
import * as bannersConstants from '../constants/banner'
import { Banner } from '../models/banner'

export interface State {
  isPending: boolean
  error: object
  banners: Banner[]
  presignedurl: string
  banner: Banner | void
  next: string
  prev: string
  count: number
}

const bannersInitialState: State = {
  isPending: false,
  error: {},
  banners: [],
  presignedurl: '',
  banner: null,
  next: '',
  prev: '',
  count: null
}

export function reducer(
  state = bannersInitialState,
  action: bannersActions.Actions
) {
  switch (action.type) {
    case bannersConstants.REQUEST_BANNERS_LIST:
    case bannersConstants.REQUEST_BANNER:
    case bannersConstants.REQUEST_BANNER_CREATE:
    case bannersConstants.REQUEST_BANNER_DELETE:
    case bannersConstants.REQUEST_BANNER_UPDATE:
    case bannersConstants.REQUEST_BANNER_PRESIGNED:
    case bannersConstants.REQUEST_BANNER_UPLOAD:
      return Object.assign({}, state, {
        isPending: true
      })

    case bannersConstants.REQUEST_BANNERS_LIST_COMPLETE:
      return Object.assign({}, state, {
        isPending: false,
        error: {},
        banners: action.payload.results,
        next: action.payload.next,
        prev: action.payload.prev,
        count: action.payload.count
      })

    case bannersConstants.REQUEST_BANNER_COMPLETE:
      return Object.assign({}, state, {
        error: {},
        banner: action.payload,
        isPending: false
      })

    case bannersConstants.REQUEST_BANNER_CREATE_COMPLETE:
      return Object.assign({}, state, {
        isPending: false,
        error: {},
        banners: [action.payload.results[0], ...state.banners]
      })

    case bannersConstants.REQUEST_BANNER_PRESIGNED_COMPLETE:
      return Object.assign({}, state, {
        presignedurl: action.payload,
        isPending: false,
        error: {}

      })

    case bannersConstants.REQUEST_BANNER_DELETE_COMPLETE:
      return Object.assign({}, state, {
        banners: state.banners.filter((element: any) => {
          return element.id !== action.payload.id
        }),
        isPending: false,
        error: {}
      })

    case bannersConstants.REQUEST_BANNER_UPDATE_COMPLETE:
      return Object.assign({}, state, {
        banners: state.banners.map((element: any) => {
          return element.id === action.payload['id'] ? action.payload : element
        }),
        isPending: false,
        error: {}
      })

    case bannersConstants.REQUEST_BANNER_UPLOAD_COMPLETE:
      break

    case bannersConstants.REQUEST_BANNERS_LIST_ERROR:
    case bannersConstants.REQUEST_BANNER_CREATE_ERROR:
    case bannersConstants.REQUEST_BANNER_DELETE_ERROR:
    case bannersConstants.REQUEST_BANNER_ERROR:
    case bannersConstants.REQUEST_BANNER_PRESIGNED_ERROR:
    case bannersConstants.REQUEST_BANNER_UPLOAD_ERROR:
    case bannersConstants.REQUEST_BANNER_UPDATE_ERROR:
      return Object.assign({}, state, {
        isPending: false,
        error: action.payload
      })
    default:
      return state
  }
}

export const getBanners = (state: State) => state.banners
export const getBanner = (state: State) => state.banner
export const getBannersError = (state: State) => state.error
export const getBannerStatus = (state: State) => state.isPending
export const getPreSignedUrl = (state: State) => state.presignedurl

export const getBannersCount = (state: State) => state.count
export const getBannersNext = (state: State) => state.next
export const getBannersPrev = (state: State) => state.prev
