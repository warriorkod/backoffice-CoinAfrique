import {catchError, map, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import * as isahitConstants from '../constants/isahit';
import * as isahitActions from '../actions/isahit';
import { IsahitService } from '../services';

@Injectable()
export class IsahitEffects {
  @Effect()
  requestOauth$: Observable<Action> = this._actions$
    .pipe(
      ofType(isahitConstants.REQUEST_ISAHIT_GET_TOKEN),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getIsahitToken().pipe(
          map((data: any) => new isahitActions.RequestIsahitComplete(data)),
          catchError(error => of(new isahitActions.RequestIsahitError(error))));
      }));

  @Effect()
  requestGetIsahitToken$: Observable<Action> = this._actions$
    .pipe(
      ofType(isahitConstants.REQUEST_ISAHIT_GET_TOKEN),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getIsahitToken().pipe(
          map((data: any) => new isahitActions.RequestIsahitComplete(data)),
          catchError(error => of(new isahitActions.RequestIsahitError(error))));
      }));

  @Effect()
  requestGetIsahitTask$: Observable<Action> = this._actions$
    .pipe(
      ofType(isahitConstants.REQUEST_ISAHIT_GET_TASK),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getIsahitTask().pipe(
          map(data => new isahitActions.RequestIsahitComplete(data)),
          catchError(error => of(new isahitActions.RequestIsahitError(error))));
      }));

  constructor(private _actions$: Actions, private _apisService: IsahitService) { }
}
