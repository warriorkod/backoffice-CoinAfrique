import * as annonceRfuActions from '../actions/annoncesrfu';
import * as annonceRfuConstants from '../constants/annoncesrfu';

import { Annoncerfu } from '../models/annoncerfu';

export interface State {
    locks: Array<any>;
    stats: {};
    messages: '';
    next: '';
    prev: '';
    total: 0;
    annonces: Annoncerfu[];
    annonce: Annoncerfu;
    isPending: boolean;
    error: Object;
  }

  const annoncesInitialState: State = {
    locks: null,
    stats: {},
    messages: '',
    next: '',
    prev: '',
    total: 0,
    annonces: null,
    annonce: null,
    isPending: false,
    error: {}
  };

  export function reducer(
    state = annoncesInitialState,
    action: annonceRfuActions.Actions
  ) {switch (action.type) {
    case annonceRfuConstants.SEARCH_ELEMENT_RFU:
    case annonceRfuConstants.REQUEST_LINK_ANNONCE_RFU:
    case annonceRfuConstants.REQUEST_GET_ANNONCERFU:
    case annonceRfuConstants.REQUEST_ANNONCESRFU: {
      return Object.assign({}, state, {
        isPending: true
      });
    }
    case annonceRfuConstants.SEARCH_ELEMENT_RFU_COMPLETE: {
      return Object.assign({}, state, {
        annonces: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        total: action.payload.count,
        isPending: false,
      });
    }

    case annonceRfuConstants.REQUEST_ANNONCESRFU_COMPLETE: {
        return Object.assign({}, state, {
          annonces: action.payload['results'],
          next: action.payload['next'],
          prev: action.payload['previous'],
          total: action.payload['count'],
          isPending: false,
          error: {}
        });
      }
    case annonceRfuConstants.REQUEST_GET_ANNONCERFU_COMPLETE: {
        return Object.assign({}, state, {
          annonce: action.payload,
          isPending: false,
          error: {}
        });
    }
    case annonceRfuConstants.SEARCH_ELEMENT_RFU_ERROR:
    case annonceRfuConstants.REQUEST_LINK_ANNONCE_RFU_ERROR:
    case annonceRfuConstants.REQUEST_GET_ANNONCERFU_ERROR:
    case annonceRfuConstants.REQUEST_ANNONCESRFU_ERROR: {
      return Object.assign({}, state, {
        isPending: false,
        error: action.payload
      });
    }
    case annonceRfuConstants.REQUEST_ANNONCESRFU_LOCKS_COMPLETE:
    case annonceRfuConstants.REQUEST_GET_ANNONCERFU_LOCKS: {
        return Object.assign({}, state, {
          locks: action.payload,
          isPending: false
        });
      }
      case annonceRfuConstants.REQUEST_LINK_ANNONCE_RFU_COMPLETE: {
          return Object.assign({}, state, {
            messages: action.payload,
            isPending: false,
            error: {}
          });
      }
    default: {
        return state;
    }
    }

  }


export const getRfuLocks = (state: State) => state.locks;
export const getAnnonceRfu = (state: State) => state.annonce;
export const getAnnoncesRfu = (state: State) => state.annonces;
export const getAnnoncesRfuNext = (state: State) => state.next;
export const getAnnoncesRfuPrev = (state: State) => state.prev;
export const getAnnoncesRfuCount = (state: State) => state.total;
export const getAnnonceRfuError = (state: State) => state.error;
export const getAnnonceRfuStatus = (state: State) => state.isPending;
