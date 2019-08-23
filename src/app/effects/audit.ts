import {catchError, switchMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import * as auditsConstants from '../constants/audits';
import * as auditsActions from '../actions/audits';
import { AuditService } from '../services';

@Injectable()
export class AuditsEffects {
  @Effect()
  requestOauth$: Observable<Action> = this._actions$
    .pipe(
      ofType(auditsConstants.REQUEST_AUDITS),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getAudits().pipe(
          map((data: any) => new auditsActions.RequestAuditsComplete(data)),
          catchError(error => of(new auditsActions.RequestAuditsError(error))));
      }));

  @Effect()
  requestGetAdAudits$: Observable<Action> = this._actions$
    .pipe(
      ofType(auditsConstants.REQUEST_AUDITS),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getAdAudits(params).pipe(
          map(data => new auditsActions.RequestGetAdAuditsComplete(data)),
          catchError(error => of(new auditsActions.RequestAuditsError(error))));
      }));

  @Effect()
  requestGetAudit$: Observable<Action> = this._actions$
    .pipe(
      ofType(auditsConstants.REQUEST_GET_AUDIT),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getAudit(params).pipe(
          map(data => new auditsActions.RequestGetAuditComplete(data)),
          catchError(error => of(new auditsActions.RequestGetAuditError(error))));
      }));

  @Effect()
  getListAudits: Observable<Action> = this._actions$
    .pipe(
      ofType(auditsConstants.GET_LIST_AUDITS),
    map(toPayload),
      switchMap((adIds: string) => {
        return this._apisService
          .getListAudits(adIds).pipe(
          map(data => new auditsActions.GetListAuditsComplete(data)),
          catchError(error => of(new auditsActions.GetListAuditsError(error))),)
      }))

  constructor(private _actions$: Actions, private _apisService: AuditService) { }
}
