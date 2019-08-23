import { Action } from './overrides';

import * as isahitConstants from '../constants/isahit';

export class RequestIsahit implements Action {
  readonly type = isahitConstants.REQUEST_ISAHIT;
  constructor(public payload = Object) { }
}

export class RequestGetIsahitToken implements Action {
  readonly type = isahitConstants.REQUEST_ISAHIT_GET_TOKEN;
  constructor(public payload = Object) { }
}

export class RequestGetIsahitTask implements Action {
  readonly type = isahitConstants.REQUEST_ISAHIT_GET_TASK;
  constructor(public payload = Object) { }
}

export class RequestPostIsahitToken implements Action {
  readonly type = isahitConstants.REQUEST_ISAHIT_POST_TOKEN;
  constructor(public payload = Object) { }
}

export class RequestIsahitComplete implements Action {
  readonly type = isahitConstants.REQUEST_ISAHIT_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestIsahitError implements Action {
  readonly type = isahitConstants.REQUEST_ISAHIT_ERROR;
  constructor(public payload: Object) { }
}



export type Actions =
  | RequestIsahit
  | RequestGetIsahitToken
  | RequestGetIsahitTask
  | RequestPostIsahitToken
  | RequestIsahitComplete
  | RequestIsahitError;
