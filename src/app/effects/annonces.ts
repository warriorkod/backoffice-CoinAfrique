import {catchError, switchMap, map} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import * as annoncesConstants from '../constants/annonces';
import * as annoncesActions from '../actions/annonces';
import { AnnonceService, AnnonceLockService } from '../services';

@Injectable()
export class AnnoncesEffects {
  @Effect()
  requestOauth$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_ANNONCES),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getAnnonces(params).pipe(
          map((data: any) => new annoncesActions.RequestAnnoncesComplete(data)),
          catchError(error => of(new annoncesActions.RequestAnnoncesError(error))),);
      }));

  @Effect()
  requestGetAnnonce$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_GET_ANNONCE),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getAnnonce(params).pipe(
          map(data =>  new annoncesActions.RequestGetAnnonceComplete(data)),
          catchError(error => of(new annoncesActions.RequestGetAnnonceError(error))),);
      }));

  @Effect()
  requestGetAnnonceLock$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_GET_ANNONCE_LOCK),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getAnnonce(params).pipe(
          map(data =>  new annoncesActions.AnnonceLock(data)),
          catchError(error => of(new annoncesActions.RequestGetAnnonceError(error))),);
      }));

  @Effect()
  requestGetAnnonceLocks$: Observable<Action> = this._actions$
  .pipe(
    ofType(annoncesConstants.REQUEST_GET_ANNONCE_LOCKS),
    map(toPayload),
    switchMap(params => {
      return this._annonceLockService
        .getLocks().pipe(
        map((data: any) => {
          return new annoncesActions.RequestGetAnnoncesLocksComplete(data.objects)
        }),
        catchError(error => of(new annoncesActions.RequestGetAnnonceError(error))),);
    }));

  @Effect()
  annonceLock$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.ANNONCE_LOCK),
      map(toPayload),
      switchMap(params => {
        return this._annonceLockService
          .getLock(params.id).pipe(
          map(data => {
            const user = JSON.parse(localStorage.getItem("bo::user"));
            if (data.object.username === user.username) {
              return new annoncesActions.RequestGetAnnonce(params)
            }
            return new annoncesActions.RequestGetAnnonceError(data)
          }),
          catchError(() => {
            this._annonceLockService.postLock(params.id)
            return of(new annoncesActions.RequestGetAnnonce(params))
          }),)
      }))

  @Effect()
  requestGetAnnonceChat$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_GET_ANNONCE_CHAT),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getAnnonce(params).pipe(
          map(data => new annoncesActions.RequestGetAnnonceChatComplete(data)),
          catchError(error => of(new annoncesActions.RequestGetAnnonceChatError(error))),);
      }));

  @Effect()
  requestGetAnnoncePremium$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_GET_ANNONCE_PREMIUM),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getAnnonce(params).pipe(
          map(data => new annoncesActions.RequestGetAnnoncePremiumComplete(data)),
          catchError(error =>
            of(new annoncesActions.RequestGetAnnoncePremiumError(error))
          ),);
      }));

  @Effect()
  requestGetAnnoncesEtatStats$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_ANNONCES_STATUS_STATS),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getAnnoncesStats(params).pipe(
          map(
            data => new annoncesActions.RequestGetAnnoncesEtatStatsComplete(data)
          ),
          catchError(error =>
            of(new annoncesActions.RequestGetAnnoncesEtatStatsError(error))
          ),);
      }));

  @Effect()
  requestUpdateAnnonce$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_UPDATE_ANNONCE),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .putAnnonce(params).pipe(
          map(data => {
            let message = 'Votre annonce a été modifié avec succés';
            if (params['etat_type']) {
              if (params['etat_type'] === 1) {
                message = 'Votre annonce a été validée avec succés';
              }
              if (params['etat_type'] === 2) {
                message = 'Votre annonce a été rejetté avec succés';
              }
            }
            const data_bis = data;
            data_bis['message'] = message;
            return new annoncesActions.RequestUpdateAnnonceComplete(data_bis);
          }),
          catchError(error => {
            return of(new annoncesActions.RequestUpdateAnnonceError(error))
          }),);
      }));

  @Effect()
  requestEditAnnonce$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_EDIT_ANNONCE),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .putAnnonce(params).pipe(
          map((data: any) => new annoncesActions.RequestEditAnnonceComplete(data)),
          catchError(error => of(new annoncesActions.RequestEditAnnonceError(error))));
      }));

  @Effect()
  requestLinkAnnonce$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_LINK_ANNONCE),
      map(toPayload),
      switchMap(params => {
        const linkParams = {
          id: params.id.id,
          ad_title: params.id.titre || '',
          ad_photo_url: params.id.photo1.normal || ''
        }

        return this._apisService
          .getAnnonceLink(linkParams).pipe(
          map((data: any) => new annoncesActions.RequestLinkAnnonceComplete(data)),
          catchError(error => of(new annoncesActions.RequestLinkAnnonceError(error))),);
      }));

  @Effect()
  requestCreateAnnonceCollection$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_CREATE_ANNONCE_COLLECTION),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .postAnnonceCollection(params).pipe(
          map(
            (data: any) =>
              new annoncesActions.RequestCreateAnnonceCollectionComplete(data)
          ),
          catchError(error =>
            of(new annoncesActions.RequestCreateAnnonceCollectionError(error))
          ),);
      }));

  @Effect()
  requestModerateAnnonce$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_MODERATE_ANNONCE),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .moderateAnnonce(params).pipe(
          map((data: any) => new annoncesActions.RequestModerateAnnonceComplete(data)),
          catchError(error =>
            of(new annoncesActions.RequestModerateAnnonceError(error))
          ),);
      }));

  @Effect()
  requestCreatePromotion$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_PROMOTION_CREATE),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .postPromotion(params).pipe(
          map(data => {
            if (data['success'] === true) {
              return new annoncesActions.RequestPromotionComplete({
                message: 'Promotion ajouté!',
                success: data['success'],
                id: data['id']
              });
            } else {
              return new annoncesActions.RequestPromotionError(data);
            }
          }),
          catchError(error => of(new annoncesActions.RequestPromotionError(error))),);
      }));

  @Effect()
  requestStopPromotion$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_STOP_PROMOTING),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .stopPromotion(params).pipe(
          map(data => {
            console.log(data);
            if (data['success'] === true) {
              return new annoncesActions.RequestPromotionComplete({
                message: 'Promotion en cours de l\'annonce arretée!',
                success: data['success'],
                id: data['id']
              });
            } else {
              return new annoncesActions.RequestPromotionError(data);
            }
          }),
          catchError(error => of(new annoncesActions.RequestPromotionError(error))),);
      }));

  @Effect()
  requestCancelPromo$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_CANCEL_PROMO),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .cancelPromo(params).pipe(
          map(data => {
            console.log(data);
            if (data['success'] === true) {
              return new annoncesActions.RequestPromotionComplete({
                message: 'Promotion de l\'annonce annulée!',
                success: data['success'],
                id: data['id']
              });
            } else {
              return new annoncesActions.RequestPromotionError(data);
            }
          }),
          catchError(error => of(new annoncesActions.RequestPromotionError(error))),);
      }));

  @Effect()
  requestUploadPicture$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_ANNONCE_PICTURE_UPLOAD),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .updatePicture(params).pipe(
          map(data => new annoncesActions.RequestUpdatePictureAnnonceComplete(data)),
          catchError(error =>
            of(new annoncesActions.RequestUpdatePictureAnnonceError(error))
          ),);
      }));


  @Effect()
  requestDeletePicture$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_ANNONCE_PICTURE_DELETE),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .deletePhoto(params).pipe(
          map(data => new annoncesActions.RequestDeletePictureAnnonceComplete(data)),
          catchError(error =>
            of(new annoncesActions.RequestDeletePictureAnnonceError(error))
          ),);
      }));


  @Effect()
  requestRefreshCache$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_ANNONCE_REFRESH_CACHE),
      map(toPayload),
      switchMap(data => {
        return this._apisService
          .refreshCache().pipe(
          map(data => new annoncesActions.RequestAnnonceRefreshCacheComplete(data)),
          catchError(error => of(new annoncesActions.RequestAnnonceRefreshCacheError(error))),);
      }));

  @Effect()
  searchElement$ : Observable<Action> = this._actions$
  .pipe(
    ofType(annoncesConstants.SEARCH_ELEMENT),
    map(toPayload),
    switchMap(payload=> {
      return this._apisService
        .searchAnnonces(payload, true).pipe( // fetch full results - with pagination info and so on
        map(data => new annoncesActions.SearchElementComplete(data)),
        catchError(error => of(new annoncesActions.SearchElementError(error))),);
    }));

  constructor(
    private _actions$: Actions,
    private _apisService: AnnonceService,
    private _annonceLockService: AnnonceLockService
  ) { }
}
