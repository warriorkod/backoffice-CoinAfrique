import * as isahitActions from '../actions/isahit';
import * as isahitConstants from '../constants/isahit';

import { IsahitToken,
         IsahitTask } from '../models/isahit';

export interface State {
  tokens: IsahitToken[];
  tasks: IsahitTask[];
  isPending: boolean;
  error: Object;
}

const isahitsInitialState: State = {
  tokens: null,
  tasks: null,
  isPending: false,
  error: {}
};

export function reducer(
  state = isahitsInitialState,
  action: isahitActions.Actions
) {
  switch (action.type) {

    case isahitConstants.REQUEST_ISAHIT: {
      return Object.assign({}, state, {
        isPending: true
      });
    }
    case isahitConstants.REQUEST_ISAHIT_COMPLETE: {
      return Object.assign({}, state, {
        tokens: action.payload,
        isPending: false,
        error: {}
      });
    }

    default: {
      return state;
    }
  }
}

export const getIsahitToken = (state: State) => state.tokens;
export const getIsahitTask = (state: State) => state.tasks;
export const getIsahitStatus = (state: State) => state.isPending;
export const getIsahitError = (state: State) => state.error;
