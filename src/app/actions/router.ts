import { Action } from './overrides';
import { NavigationExtras } from '@angular/router';
import * as routerConstants from "../constants/router";

export class Go implements Action {
  readonly type = routerConstants.GO;

  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = routerConstants.BACK;
  constructor(payload: any = {}) {}
}

export class Forward implements Action {
  readonly type = routerConstants.FORWARD;
  constructor(payload: any = {}) {}
}

export type Actions = Go | Back | Forward;
