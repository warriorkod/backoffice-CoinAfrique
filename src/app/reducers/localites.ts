import * as localitesActions from '../actions/localites';
import * as localitesConstants from '../constants/localites';

import { Localites } from '../models/localites';

export interface State {
  localites: Localites[];
  isPending: boolean;
  error: Object;
}

const localitesInitialState: State = {
  localites: null,
  isPending: false,
  error: {}
};

export function reducer(state = localitesInitialState, action: localitesActions.Actions) {
  switch (action.type) {
    case localitesConstants.REQUEST_LOCALITES: {
      return Object.assign({}, state, {
        isPending: true
      });

    }

    case localitesConstants.REQUEST_LOCALITES_COMPLETE: {
      return Object.assign({}, state, {
        localites: action.payload,
        isPending: false,
        error: {}
      });
    }

    case localitesConstants.REQUEST_LOCALITES_ERROR: {
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


export const getLocalites = (state: State) => state.localites;
export const getLocalitesStatus = (state: State) => state.isPending;
export const getLocalitesError = (state: State) => state.error;
