import * as auditActions from "../actions/audits";
import * as auditConstants from "../constants/audits";

import { Audit } from "../models/audits";


export interface State {
  audits: Array<Audit>,
  error: Object,
  isPending: boolean
}

const auditsInitialState: State = {
  audits: [],
  error: {},
  isPending: false
}

export function reducer(
  state = auditsInitialState,
  action: auditActions.Actions
) {
  switch (action.type) {
    case auditConstants.GET_LIST_AUDITS: {
      return Object.assign({}, state, {
        isPending: true
      })
    }
    case auditConstants.GET_LIST_AUDITS_COMPLETE: {
      return Object.assign({}, state, {
        audits: action.payload,
        isPending: false,
        error: {}
      })
    }
    case auditConstants.GET_LIST_AUDITS_ERROR: {
      return Object.assign({}, state, {
        isPending: false,
        error: action.payload
      })
    }
    default: {
      return state
    }
  }
}

export const getListAuditsError = (state: State) => state.error
export const getListAuditsStatus = (state: State) => state.isPending
