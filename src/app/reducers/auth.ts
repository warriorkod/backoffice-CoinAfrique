import * as authActions from '../actions/auth';
import * as authConstants from '../constants/auth';

export interface State {
  isPending: boolean;
  error: Object;
  messages: any;
}

const authInitialState: State = {
  isPending: false,
  error: {},
  messages: '',

};

export function reducer(
  state = authInitialState,
  action: authActions.Actions
) {
  switch (action.type) {
    case authConstants.REQUEST_MAKE_SYNC: {
      return Object.assign({}, state, {
        isPending: true
      });
    }
    case authConstants.REQUEST_MAKE_SYNC_COMPLETE: {
      return Object.assign({}, state, {
        isPending: false,
        error: {}
      });
    }

    case authConstants.REQUEST_MAKE_SYNC_ERROR: {
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

export const getAuthStatus = (state: State) => state.isPending;
export const getAuthError = (state: State) => state.error;

