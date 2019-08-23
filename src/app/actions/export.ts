import { Action } from './overrides';

import * as exportsConstants from '../constants/export';

export class RequestSendReportComplete implements Action {
  readonly type = exportsConstants.REQUEST_SEND_REPORT_COMPLETE;
  constructor(public payload: any) { }
}
export type Actions =
  | RequestSendReportComplete ;
