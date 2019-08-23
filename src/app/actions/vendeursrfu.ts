import { Action } from './overrides';

import * as vendeursConstantsrfu from '../constants/vendeursrfu';

export class RequestVendeurRfu implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuComplete implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuError implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_ERROR;
  constructor(public payload = null) { }
}

export class RequestResetVendeurRfuComplete implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_RESET_VENDEUR_RFU_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestVendeursRfu implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU;
  constructor(public payload = null) { }
}

export class RequestVendeursRfuComplete implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeursRfuError implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_ERROR;
  constructor(public payload = null) { }
}


export class RequestVendeursRfuExport implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_EXPORT;
  constructor(public payload = null) { }
}

export class RequestVendeursRfuExportComplete implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_EXPORT_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeursRfuExportError implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_EXPORT_ERROR;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuCreate implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_CREATE;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuCreateComplete implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_CREATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuCreateError implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_CREATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuUpdate implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_UPDATE;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuUpdateComplete implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_UPDATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuUpdateError implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_UPDATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuDelete implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_DELETE;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuDeleteComplete implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_DELETE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeurRfuDeleteError implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEUR_RFU_DELETE_ERROR;
  constructor(public payload = null) { }
}

export class RequestVendeursRfuNext implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_NEXT;
  constructor(public payload = null) { }
}

export class RequestVendeursRfuNextComplete implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_NEXT_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeursRfuNextError implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_NEXT_ERROR;
  constructor(public payload = null) { }
}

export class RequestVendeursRfuPrev implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_PREV;
  constructor(public payload = null) { }
}

export class RequestVendeursRfuPrevComplete implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_PREV_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeursRfuPrevError implements Action {
  readonly type = vendeursConstantsrfu.REQUEST_VENDEURS_RFU_PREV_ERROR;
  constructor(public payload = null) { }
}

export type Actions =
  | RequestVendeurRfu
  | RequestVendeurRfuComplete
  | RequestVendeurRfuError
  | RequestVendeursRfu
  | RequestVendeursRfuComplete
  | RequestVendeursRfuError
  | RequestVendeursRfuExport
  | RequestVendeursRfuExportComplete
  | RequestVendeursRfuExportError
  | RequestVendeurRfuCreate
  | RequestVendeurRfuCreateComplete
  | RequestVendeurRfuCreateError
  | RequestVendeurRfuUpdate
  | RequestVendeurRfuUpdateComplete
  | RequestVendeurRfuUpdateError
  | RequestVendeurRfuDelete
  | RequestVendeurRfuDeleteComplete
  | RequestVendeurRfuDeleteError
  | RequestResetVendeurRfuComplete;
