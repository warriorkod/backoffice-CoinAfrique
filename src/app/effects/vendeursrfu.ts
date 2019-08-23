import {catchError, switchMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import * as vendeursConstantsrfu from '../constants/vendeursrfu';
import * as vendeursActionsrfu from '../actions/vendeursrfu';
import * as fromRoot from '../reducers';
import { VendeursrfuService } from '../services/vendeursrfu.service';

@Injectable()
export class VendeursRfuEffects {


  @Effect()
    requestVendeurRfu$: Observable<Action> = this._actions$
      .pipe(
        ofType(vendeursConstantsrfu.REQUEST_VENDEUR_RFU),
        map(toPayload),
        switchMap(params => {
          return this._apisService
            .getVendeur(params).pipe(
            map(data => new vendeursActionsrfu.RequestVendeurRfuComplete(data)),
            catchError(error => of(new vendeursActionsrfu.RequestVendeurRfuError(error))));
    }));

  @Effect()
  requestVendeursRfu$: Observable<Action> = this._actions$
    .pipe(
      ofType(vendeursConstantsrfu.REQUEST_VENDEURS_RFU),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getVendeurs(params).pipe(
          map(data => new vendeursActionsrfu.RequestVendeursRfuComplete(data)),
          catchError(error => of(new vendeursActionsrfu.RequestVendeursRfuError(error))));
      }));

  @Effect()
  requestVendeursRfuExport$: Observable<Action> = this._actions$
    .pipe(
      ofType(vendeursConstantsrfu.REQUEST_VENDEURS_RFU_EXPORT),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getVendeursExport(params).pipe(
          map(data => new vendeursActionsrfu.RequestVendeursRfuExportComplete(data)),
          catchError(error => of(new vendeursActionsrfu.RequestVendeursRfuExportError(error))));
      }));

      @Effect()
      requestVendeurRfuCreate$: Observable<Action> = this._actions$
        .pipe(
          ofType(vendeursConstantsrfu.REQUEST_VENDEUR_RFU_CREATE),
          map(toPayload),
          switchMap((params) => {
            return this._apisService.postVendor(params).pipe(
              map(data => new vendeursActionsrfu.RequestVendeurRfuCreateComplete(data)),
              catchError(error => of(new vendeursActionsrfu.RequestVendeurRfuCreateError(error))));
          }));
    

  @Effect()
  requestUpdateVendeursRfu$: Observable<Action> = this._actions$
    .pipe(
      ofType(vendeursConstantsrfu.REQUEST_VENDEUR_RFU_UPDATE),
      map(toPayload),
      switchMap((params: any) => {
        return this._apisService
          .putVendeur(params).pipe(
          map(data => new vendeursActionsrfu.RequestVendeurRfuUpdateComplete(data)),
          catchError(error =>
            of(new vendeursActionsrfu.RequestVendeurRfuUpdateError(error))
          ));
      }));

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: VendeursrfuService
  ) { }
}
