import { Action } from './overrides';

import * as localitesConstants from '../constants/localites';


export class RequestLocalites implements Action {
  readonly type = localitesConstants.REQUEST_LOCALITES;
  constructor(public payload = null) { }
}

export class RequestLocalitesComplete implements Action {
  readonly type = localitesConstants.REQUEST_LOCALITES_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestLocalitesError implements Action {
  readonly type = localitesConstants.REQUEST_LOCALITES_ERROR;
  constructor(public payload = null) { }
}



export type Actions
  =
| RequestLocalites
| RequestLocalitesComplete
| RequestLocalitesError