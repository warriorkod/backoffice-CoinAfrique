import {switchMap, map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import * as locksConstants from '../constants/locks';
import * as locksActions from '../actions/locks';
import { LockService } from '../services';

@Injectable()
export class LocksEffects {
  @Effect()
  requestOauth$: Observable<Action> = this._actions$
    .pipe(
      ofType(locksConstants.REQUEST_LOCKS),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getLocks().pipe(
          map((data: any) => new locksActions.RequestLocksComplete(data)),
          catchError(error => of(new locksActions.RequestLocksError(error))));
      }));

  @Effect()
  requestGetLock$: Observable<Action> = this._actions$
    .pipe(
      ofType(locksConstants.REQUEST_GET_LOCK),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getLock(params).pipe(
          map(data => new locksActions.RequestGetLockComplete(data)),
          catchError(error => of(new locksActions.RequestGetLockError(error))));
      }));

  constructor(private _actions$: Actions, private _apisService: LockService) { }
}
