import { Action } from './overrides';

import * as auditsConstants from '../constants/audits';

export class RequestAudits implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS;
  constructor(public payload = null) { }
}

export class RequestAuditsNext implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_NEXT;
  constructor(public payload = null) { }
}

export class RequestAuditsNextComplete implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_NEXT_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestAuditsNextError implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_NEXT_ERROR;
  constructor(public payload = null) { }
}

export class RequestAuditsPrev implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_PREV;
  constructor(public payload = null) { }
}

export class RequestAuditsPrevComplete implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_PREV_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestAuditsPrevError implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_PREV_ERROR;
  constructor(public payload = null) { }
}

export class RequestAuditsComplete implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestAuditsError implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetAudit implements Action {
  readonly type = auditsConstants.REQUEST_GET_AUDIT;
  constructor(public payload = null) { }
}


export class RequestGetAuditsEtatStats implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_STATUS_STATS;
  constructor(public payload = null) { }
}

export class RequestGetAuditsEtatStatsComplete implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_STATUS_STATS_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestGetAuditComplete implements Action {
  readonly type = auditsConstants.REQUEST_GET_AUDIT_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestGetAdAuditsComplete implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestGetAuditError implements Action {
  readonly type = auditsConstants.REQUEST_GET_AUDIT_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetAuditPremiumError implements Action {
  readonly type = auditsConstants.REQUEST_GET_AUDIT_PREMIUM_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetAuditsEtatStatseError implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_STATUS_STATS_ERROR;
  constructor(public payload: Object) { }
}

export class RequestCreateAudit implements Action {
  readonly type = auditsConstants.REQUEST_CREATE_AUDIT;
  constructor(public payload = null) { }
}

export class RequestCreateAuditComplete implements Action {
  readonly type = auditsConstants.REQUEST_CREATE_AUDIT_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestCreateAuditError implements Action {
  readonly type = auditsConstants.REQUEST_CREATE_AUDIT_ERROR;
  constructor(public payload: Object) { }
}

export class RequestUpdateAudit implements Action {
  readonly type = auditsConstants.REQUEST_UPDATE_AUDIT;
  constructor(public payload: any) { }
}

export class RequestUpdateAuditComplete implements Action {
  readonly type = auditsConstants.REQUEST_UPDATE_AUDIT_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestUpdateAuditError implements Action {
  readonly type = auditsConstants.REQUEST_UPDATE_AUDIT_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetAuditsEtatStatsError implements Action {
  readonly type = auditsConstants.REQUEST_AUDITS_STATUS_STATS_ERROR;
  constructor(public payload: Object) { }
}

export class RequestDeleteAudit implements Action {
  readonly type = auditsConstants.REQUEST_DELETE_AUDIT;
  constructor(public payload) { }
}

export class RequestDeleteAuditComplete implements Action {
  readonly type = auditsConstants.REQUEST_DELETE_AUDIT_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestDeleteAuditError implements Action {
  readonly type = auditsConstants.REQUEST_DELETE_AUDIT_ERROR;
  constructor(public payload: Object) { }
}

export class RequestLinkAuditError implements Action {
  readonly type = auditsConstants.REQUEST_LINK_AUDIT_ERROR;
  constructor(public payload: any[]) { }
}

export class RequestCreateAuditCollection implements Action {
  readonly type = auditsConstants.REQUEST_CREATE_AUDIT_COLLECTION;
  constructor(public payload = null) { }
}

export class RequestCreateAuditCollectionComplete implements Action {
  readonly type = auditsConstants.REQUEST_CREATE_AUDIT_COLLECTION_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestCreateAuditCollectionError implements Action {
  readonly type = auditsConstants.REQUEST_CREATE_AUDIT_COLLECTION_ERROR;
  constructor(public payload: any[]) { }
}

export class RequestEditAudit implements Action {
  readonly type = auditsConstants.REQUEST_EDIT_AUDIT;
  constructor(public payload = null) { }
}

export class RequestEditAuditComplete implements Action {
  readonly type = auditsConstants.REQUEST_EDIT_AUDIT_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestEditAuditError implements Action {
  readonly type = auditsConstants.REQUEST_EDIT_AUDIT_ERROR;
  constructor(public payload: Object) { }
}

export class RequestResetAuditComplete implements Action {
  readonly type = auditsConstants.REQUEST_RESET_AUDIT_COMPLETE;
  constructor(public payload = {}) { }
}

export class GetListAuditsComplete implements Action {
  readonly type = auditsConstants.GET_LIST_AUDITS_COMPLETE
  constructor(public payload: any) {}
}

export class GetListAuditsError implements Action {
  readonly type = auditsConstants.GET_LIST_AUDITS_ERROR
  constructor(public payload: Object) {}
}

export class GetListAudits implements Action {
  readonly type = auditsConstants.GET_LIST_AUDITS
  constructor(public payload = null) {}
}

export type Actions =
  | RequestAudits
  | RequestAuditsComplete
  | RequestAuditsError
  | RequestEditAudit
  | RequestEditAuditComplete
  | RequestEditAuditError
  | RequestGetAudit
  | RequestGetAuditComplete
  | RequestGetAuditError
  | RequestCreateAudit
  | RequestCreateAuditComplete
  | RequestCreateAuditError
  | RequestUpdateAudit
  | RequestUpdateAuditComplete
  | RequestUpdateAuditError
  | RequestDeleteAudit
  | RequestDeleteAuditComplete
  | RequestDeleteAuditError
  | RequestResetAuditComplete
  | RequestGetAuditsEtatStats
  | RequestGetAuditsEtatStatsComplete
  | RequestGetAuditsEtatStatsError
  | RequestCreateAuditCollection
  | RequestCreateAuditCollectionComplete
  | RequestCreateAuditCollectionError
  | GetListAudits
  | GetListAuditsComplete
  | GetListAuditsError;
