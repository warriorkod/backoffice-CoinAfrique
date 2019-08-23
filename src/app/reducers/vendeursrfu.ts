import * as vendeursActionsRfu from '../actions/vendeursrfu';
import * as vendeursConstantsRfu from '../constants/vendeursrfu';

import { Vendeursrfu } from '../models/vendeursrfu';

export interface State {
  vendeur: Vendeursrfu;
  vendeurs: Vendeursrfu[];
  export_vendeurs: string;
  isPending: boolean;
  error: Object;
  messages: any;
  next: string;
  prev: string;
  total: number;
}

const vendeurInitialState: State = {
  vendeur: null,
  vendeurs: null,
  export_vendeurs: '',
  isPending: false,
  error: {},
  messages: '',
  next: '',
  prev: '',
  total: 0
};

export function reducer(
  state = vendeurInitialState,
  action: vendeursActionsRfu.Actions
) {
  switch (action.type) {
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU:
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_CREATE:
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_UPDATE:
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_DELETE:
    case vendeursConstantsRfu.REQUEST_VENDEURS_RFU_EXPORT:
    case vendeursConstantsRfu.REQUEST_VENDEURS_RFU: {
      return Object.assign({}, state, {
        isPending: true
      });
    }
    case vendeursConstantsRfu.REQUEST_VENDEURS_RFU_COMPLETE: {
      return Object.assign({}, state, {
        vendeurs: action.payload['results'],
        next: action.payload['next'],
        prev: action.payload['prev'],
        total: action.payload['count'],
        isPending: false,
        error: {}
      });
    }

    case vendeursConstantsRfu.REQUEST_VENDEURS_RFU_EXPORT_COMPLETE: {
      return Object.assign({}, state, {
        export_vendeurs: action.payload,
        isPending: false,
        error: {}
      });
    }

    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_COMPLETE: {
      return Object.assign({}, state, {
        vendeur: action.payload,
        isPending: false,
        error: {}
      });
    }
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_CREATE_COMPLETE: {
      return Object.assign({}, state, {
        vendeurs: [action.payload, ...state.vendeurs],
        isPending: false,
        error: {}
      });
    }
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_UPDATE_COMPLETE: {
      return Object.assign({}, state, {
        vendeur: action.payload,
        isPending: false,
        error: {}
      });
    }
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_DELETE_COMPLETE: {
      return Object.assign({}, state, {
        vendeurs: state.vendeurs.filter(moderateur => {
          return moderateur.uuid !== action.payload['uuid'];
        }),
        isPending: false,
        error: {}
      });
    }
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_CREATE_ERROR:
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_UPDATE_ERROR:
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_DELETE_ERROR:
    case vendeursConstantsRfu.REQUEST_VENDEUR_RFU_ERROR:
    case vendeursConstantsRfu.REQUEST_VENDEURS_RFU_EXPORT_ERROR:
    case vendeursConstantsRfu.REQUEST_VENDEURS_RFU_ERROR: {
      return Object.assign({}, state, {
        isPending: false,
        error: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

export const getVendeurRfu = (state: State) => state.vendeur;
export const getVendeursRfu = (state: State) => state.vendeurs;
export const getVendeursRfuExport = (state: State) => state.export_vendeurs;
export const getVendeurRfuStatus = (state: State) => state.isPending;
export const getVendeurRfuError = (state: State) => state.error;
export const getVendeursRfuNext = (state: State) => state.next;
export const getVendeursRfuPrev = (state: State) => state.prev;
export const getVendeursRfuCount = (state: State) => state.total;
