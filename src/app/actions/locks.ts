import { Action } from './overrides';

import * as locksConstants from '../constants/locks';

export class RequestLocks implements Action {
  readonly type = locksConstants.REQUEST_LOCKS;
  constructor(public payload = null) { }
}

export class RequestLocksNext implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_NEXT;
  constructor(public payload = null) { }
}

export class RequestLocksNextComplete implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_NEXT_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestLocksNextError implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_NEXT_ERROR;
  constructor(public payload = null) { }
}

export class RequestLocksPrev implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_PREV;
  constructor(public payload = null) { }
}

export class RequestLocksPrevComplete implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_PREV_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestLocksPrevError implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_PREV_ERROR;
  constructor(public payload = null) { }
}

export class RequestLocksComplete implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestLocksError implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetLock implements Action {
  readonly type = locksConstants.REQUEST_GET_LOCK;
  constructor(public payload = null) { }
}


export class RequestGetLocksEtatStats implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_STATUS_STATS;
  constructor(public payload = null) { }
}

export class RequestGetLocksEtatStatsComplete implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_STATUS_STATS_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestGetLockComplete implements Action {
  readonly type = locksConstants.REQUEST_GET_LOCK_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestGetLockError implements Action {
  readonly type = locksConstants.REQUEST_GET_LOCK_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetLockPremiumError implements Action {
  readonly type = locksConstants.REQUEST_GET_LOCK_PREMIUM_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetLocksEtatStatseError implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_STATUS_STATS_ERROR;
  constructor(public payload: Object) { }
}

export class RequestCreateLock implements Action {
  readonly type = locksConstants.REQUEST_CREATE_LOCK;
  constructor(public payload = null) { }
}

export class RequestCreateLockComplete implements Action {
  readonly type = locksConstants.REQUEST_CREATE_LOCK_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestCreateLockError implements Action {
  readonly type = locksConstants.REQUEST_CREATE_LOCK_ERROR;
  constructor(public payload: Object) { }
}

export class RequestUpdateLock implements Action {
  readonly type = locksConstants.REQUEST_UPDATE_LOCK;
  constructor(public payload: any) { }
}

export class RequestUpdateLockComplete implements Action {
  readonly type = locksConstants.REQUEST_UPDATE_LOCK_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestUpdateLockError implements Action {
  readonly type = locksConstants.REQUEST_UPDATE_LOCK_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetLocksEtatStatsError implements Action {
  readonly type = locksConstants.REQUEST_LOCKS_STATUS_STATS_ERROR;
  constructor(public payload: Object) { }
}

export class RequestDeleteLock implements Action {
  readonly type = locksConstants.REQUEST_DELETE_LOCK;
  constructor(public payload) { }
}

export class RequestDeleteLockComplete implements Action {
  readonly type = locksConstants.REQUEST_DELETE_LOCK_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestDeleteLockError implements Action {
  readonly type = locksConstants.REQUEST_DELETE_LOCK_ERROR;
  constructor(public payload: Object) { }
}

export class RequestLinkLockError implements Action {
  readonly type = locksConstants.REQUEST_LINK_LOCK_ERROR;
  constructor(public payload: any[]) { }
}

export class RequestCreateLockCollection implements Action {
  readonly type = locksConstants.REQUEST_CREATE_LOCK_COLLECTION;
  constructor(public payload = null) { }
}

export class RequestCreateLockCollectionComplete implements Action {
  readonly type = locksConstants.REQUEST_CREATE_LOCK_COLLECTION_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestCreateLockCollectionError implements Action {
  readonly type = locksConstants.REQUEST_CREATE_LOCK_COLLECTION_ERROR;
  constructor(public payload: any[]) { }
}

export class RequestEditLock implements Action {
  readonly type = locksConstants.REQUEST_EDIT_LOCK;
  constructor(public payload = null) { }
}

export class RequestEditLockComplete implements Action {
  readonly type = locksConstants.REQUEST_EDIT_LOCK_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestEditLockError implements Action {
  readonly type = locksConstants.REQUEST_EDIT_LOCK_ERROR;
  constructor(public payload: Object) { }
}

export class RequestResetLockComplete implements Action {
  readonly type = locksConstants.REQUEST_RESET_LOCK_COMPLETE;
  constructor(public payload = {}) { }
}


export type Actions =
  | RequestLocks
  | RequestLocksComplete
  | RequestLocksError
  | RequestEditLock
  | RequestEditLockComplete
  | RequestEditLockError
  | RequestGetLock
  | RequestGetLockComplete
  | RequestGetLockError
  | RequestCreateLock
  | RequestCreateLockComplete
  | RequestCreateLockError
  | RequestUpdateLock
  | RequestUpdateLockComplete
  | RequestUpdateLockError
  | RequestDeleteLock
  | RequestDeleteLockComplete
  | RequestDeleteLockError
  | RequestResetLockComplete
  | RequestGetLocksEtatStats
  | RequestGetLocksEtatStatsComplete
  | RequestGetLocksEtatStatsError
  | RequestCreateLockCollection
  | RequestCreateLockCollectionComplete
  | RequestCreateLockCollectionError;
