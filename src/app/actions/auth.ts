import { Action } from './overrides';

import * as authConstants from '../constants/auth';

export class RequestMakeSync implements Action {
    readonly type = authConstants.REQUEST_MAKE_SYNC;
    constructor(public payload = null) { }
  }

  export class RequestMakeSyncComplete implements Action {
    readonly type = authConstants.REQUEST_MAKE_SYNC_COMPLETE;
    constructor(public payload: any[]) { }
  }
  
  export class RequestMakeSyncError implements Action {
    readonly type = authConstants.REQUEST_MAKE_SYNC_ERROR;
    constructor(public payload: Object) { }
  }

  export type Actions =
  | RequestMakeSync
  | RequestMakeSyncComplete
  | RequestMakeSyncError
