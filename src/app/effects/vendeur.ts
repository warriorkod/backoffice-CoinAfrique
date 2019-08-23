import {catchError, switchMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import * as vendeursConstants from '../constants/vendeurs';
import * as vendeursActions from '../actions/vendeurs';
import * as fromRoot from '../reducers';
import { VendeurService } from '../services/vendeur.service';

@Injectable()
export class VendeursEffects {


  @Effect()
  requestVendeur$: Observable<Action> = this._actions$
    .pipe(
      ofType(vendeursConstants.REQUEST_VENDEUR),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getVendeur(params).pipe(
          map(data => new vendeursActions.RequestVendeurComplete(data)),
          catchError(error => of(new vendeursActions.RequestVendeurError(error))));
    }));

  @Effect()
  requestVendeurs$: Observable<Action> = this._actions$
    .pipe(
      ofType(vendeursConstants.REQUEST_VENDEURS),
      map(toPayload),
      switchMap(params => {
        console.log(params);
        return this._apisService
          .getVendeurs(params).pipe(
          map(data => new vendeursActions.RequestVendeursComplete(data)),
          catchError(error => of(new vendeursActions.RequestVendeursError(error))));
      }));

  @Effect()
  requestVendeursExport$: Observable<Action> = this._actions$
    .pipe(
      ofType(vendeursConstants.REQUEST_VENDEURS_EXPORT),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getVendeursExport(params).pipe(
          map(data => new vendeursActions.RequestVendeursExportComplete(data)),
          catchError(error => of(new vendeursActions.RequestVendeursExportError(error))));
      }));

      @Effect()
      requestVendeurCreate$: Observable<Action> = this._actions$
        .pipe(
          ofType(vendeursConstants.REQUEST_VENDEUR_CREATE),
          map(toPayload),
          switchMap((params) => {
            console.log('parammmmm ', params);
            return this._apisService.postVendor(params).pipe(
              map(data => new vendeursActions.RequestVendeurCreateComplete(data)),
              catchError(error => of(new vendeursActions.RequestVendeurCreateError(error))));
          }));
    

  @Effect()
  requestUpdateVendeurs$: Observable<Action> = this._actions$
    .pipe(
      ofType(vendeursConstants.REQUEST_VENDEUR_UPDATE),
      map(toPayload),
      switchMap((params: any) => {
        return this._apisService
          .putVendeur(params).pipe(
          map(data => new vendeursActions.RequestVendeurUpdateComplete(data)),
          catchError(error =>
            of(new vendeursActions.RequestVendeurUpdateError(error))
          ));
      }));

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: VendeurService
  ) { }
}