import { Action } from "@ngrx/store";
import * as modalConstants from '../constants/modal';

export class showModal implements Action {
  readonly type = modalConstants.SHOW_MODAL
  constructor(public payload = null) { }
}

export class hideModal implements Action {
  readonly type = modalConstants.HIDE_MODAL
  constructor(public payload = null) { }
}

export class modalStateChangeFinished implements Action {
  readonly type = modalConstants.STATE_CHANGE_FINISHED
  constructor(public payload = null) {}
}

export type Action = 
  showModal |
  hideModal |
  modalStateChangeFinished
  