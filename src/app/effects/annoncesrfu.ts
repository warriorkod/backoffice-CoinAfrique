import {catchError, switchMap, map} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import * as annoncesRfuConstants from '../constants/annoncesrfu';
import * as annoncesRfuActions from '../actions/annoncesrfu';
import { AnnonceRfuService, AnnonceLockService } from '../services';
  
@Injectable()
export class AnnoncesRfuEffects {
  @Effect()
   requestAnnoncesRfu$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesRfuConstants.REQUEST_ANNONCESRFU),
      map(toPayload),
      switchMap(params => {
        console.log(params);
        return this._apisService
          .getAnnonces(params).pipe(
          map((data: any) => new annoncesRfuActions.RequestAnnoncesRfuComplete(data)),
          catchError(error => of(new annoncesRfuActions.RequestAnnoncesRfuError(error))),);
      }));

  @Effect()
  requestGetAnnonceRfu$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesRfuConstants.REQUEST_GET_ANNONCERFU),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getAnnonce(params).pipe(
          map(data =>  new annoncesRfuActions.RequestGetAnnonceRfuComplete(data)),
          catchError(error => of(new annoncesRfuActions.RequestGetAnnonceRfuError(error))),);
      }));


  @Effect()
  requestLinkAnnonceRFu$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesRfuConstants.REQUEST_LINK_ANNONCE_RFU),
      map(toPayload),
      switchMap(params => {
        const linkParams = {
          id: params.id.id,
          ad_title: params.id.titre || '',
          ad_photo_url: params.id.photo1.normal || ''
        }

        return this._apisService
          .getAnnonceLink(linkParams).pipe(
          map((data: any) => new annoncesRfuActions.RequestLinkAnnonceRfuComplete(data)),
          catchError(error => of(new annoncesRfuActions.RequestLinkAnnonceRfuError(error))),);
      }));

      
      @Effect()
      searchElementRfu$ : Observable<Action> = this._actions$
      .pipe(
        ofType(annoncesRfuConstants.SEARCH_ELEMENT_RFU),
        map(toPayload),
        switchMap(payload=> {
          console.log(payload);
          return this._apisService
            .searchAnnonces(payload, true).pipe( // fetch full results - with pagination info and so on
            map(data => new annoncesRfuActions.SearchElementRfuComplete(data)),
            catchError(error => of(new annoncesRfuActions.SearchElementRfuError(error))),);
        }));
        @Effect()
        annonceRfuLock$: Observable<Action> = this._actions$
          .pipe(
            ofType(annoncesRfuConstants.ANNONCERFU_LOCK),
            map(toPayload),
            switchMap(params => {
              return this._annonceLockService
                .getLock(params.id).pipe(
                map(data => {
                  const user = JSON.parse(localStorage.getItem("bo::user"));
                  if (data.object.username === user.username) {
                    return new annoncesRfuActions.RequestGetAnnonceRfu(params)
                  }
                  return new annoncesRfuActions.RequestGetAnnonceRfuError(data)
                }),
                catchError(() => {
                  this._annonceLockService.postLock(params.id)
                  return of(new annoncesRfuActions.RequestGetAnnonceRfu(params))
                }),)
            }))

    constructor(
    private _actions$: Actions,
    private _apisService: AnnonceRfuService,
    private _annonceLockService: AnnonceLockService
  ) { }
}