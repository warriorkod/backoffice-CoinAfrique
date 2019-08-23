import { Action } from './overrides';

import * as annoncesRfuConstants from '../constants/annoncesrfu';


export class RequestAnnoncesRfu implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU;
    constructor(public payload = null) { }
  }

  export class RequestAnnoncesRfuComplete implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_COMPLETE;
    constructor(public payload: any[]) { }
  }
  
  export class RequestAnnoncesRfuError implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_ERROR;
    constructor(public payload: Object) { }
  }

  export class RequestGetAnnonceRfu implements Action {
    readonly type = annoncesRfuConstants.REQUEST_GET_ANNONCERFU;
    constructor(public payload = null) { }
  }

  export class RequestGetAnnonceRfuComplete implements Action {
    readonly type = annoncesRfuConstants.REQUEST_GET_ANNONCERFU_COMPLETE;
    constructor(public payload: any) { }
  }

  export class RequestGetAnnonceRfuError implements Action {
    readonly type = annoncesRfuConstants.REQUEST_GET_ANNONCERFU_ERROR;
    constructor(public payload: Object) { }
  }


  export class RequestAnnoncesRfuNext implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_NEXT;
    constructor(public payload = null) { }
  }

  export class RequestAnnoncesRfuNextComplete implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_NEXT_COMPLETE;
    constructor(public payload = null) { }
  }
  
  export class RequestAnnoncesRfuNextError implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_NEXT_ERROR;
    constructor(public payload = null) { }
  }

  export class RequestAnnoncesRfuPrev implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_PREV;
    constructor(public payload = null) { }
  }
  
  export class RequestAnnoncesRfuPrevComplete implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_PREV_COMPLETE;
    constructor(public payload = null) { }
  }
  
  export class RequestAnnoncesRfuPrevError implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_PREV_ERROR;
    constructor(public payload = null) { }
  }
  
  export class RequestAnnoncesRfuCount implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_COUNT;
    constructor(public payload = null) { }
  }
  
  export class RequestAnnoncesRfuCountComplete implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_COUNT_COMPLETE;
    constructor(public payload = null) { }
  }
  
  export class RequestAnnoncesRfuCountError implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_COUNT_ERROR;
    constructor(public payload = null) { }
  }

  export class RequestGetAnnonceRfuLock implements Action {
    readonly type = annoncesRfuConstants.REQUEST_GET_ANNONCERFU_LOCK
    constructor(public payload = null) { }
  }
  
  export class RequestGetAnnoncesRfuLocks implements Action {
    readonly type = annoncesRfuConstants.REQUEST_GET_ANNONCERFU_LOCKS
    constructor(public payload = null) {}
  }
  
  export class RequestGetAnnoncesRfuLocksComplete implements Action {
    readonly type = annoncesRfuConstants.REQUEST_ANNONCESRFU_LOCKS_COMPLETE
    constructor(public payload: Array<any>) {}
  }
  export class AnnonceRfuLock implements Action {
    readonly type = annoncesRfuConstants.ANNONCERFU_LOCK
    constructor(public payload: any) {}
  }

  export class RequestLinkAnnonceRfu implements Action {
    readonly type = annoncesRfuConstants.REQUEST_LINK_ANNONCE_RFU;
    constructor(public payload = null) { }
  }
  
  export class RequestLinkAnnonceRfuComplete implements Action {
    readonly type = annoncesRfuConstants.REQUEST_LINK_ANNONCE_RFU_COMPLETE;
    constructor(public payload: any[]) { }
  }
  
  export class RequestLinkAnnonceRfuError implements Action {
    readonly type = annoncesRfuConstants.REQUEST_LINK_ANNONCE_RFU_ERROR;
    constructor(public payload: any[]) { }
  }

  export class SearchElementRfu implements Action {
    readonly type = annoncesRfuConstants.SEARCH_ELEMENT_RFU;
    constructor(public payload: any) { }
  }
  
  export class SearchElementRfuComplete implements Action {
    readonly type = annoncesRfuConstants.SEARCH_ELEMENT_RFU_COMPLETE;
    constructor(public payload:any) { }
  }
  
  export class SearchElementRfuError implements Action {
    readonly type = annoncesRfuConstants.SEARCH_ELEMENT_RFU_ERROR;
    constructor(public payload:any) { }
  }

  export type Actions =
  | RequestAnnoncesRfu
  | RequestAnnoncesRfuComplete
  | RequestAnnoncesRfuError
  | RequestGetAnnonceRfu
  | RequestGetAnnonceRfuComplete
  | RequestGetAnnonceRfuError
  | AnnonceRfuLock
  | RequestGetAnnonceRfuLock
  | RequestGetAnnoncesRfuLocks
  | RequestGetAnnoncesRfuLocksComplete
  | RequestLinkAnnonceRfu
  | RequestLinkAnnonceRfuComplete
  | RequestLinkAnnonceRfuError
  | SearchElementRfu
  | SearchElementRfuComplete
  | SearchElementRfuError

  