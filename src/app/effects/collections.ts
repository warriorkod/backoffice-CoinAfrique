import {catchError, switchMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import * as collectionsConstants from '../constants/collections';
import * as collectionsActions from '../actions/collections';
import * as fromRoot from '../reducers';
import { CollectionService } from '../services';


@Injectable()
export class CollectionsEffects {

  @Effect()
  requestCollections$: Observable<Action> = this._actions$
    .pipe(
      ofType(collectionsConstants.REQUEST_COLLECTIONS),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.getCollections(params).pipe(
          map((data: any) => new collectionsActions.RequestCollectionsComplete(data)),
          catchError(error => of(new collectionsActions.RequestCollectionsError(error))));
      }));

  @Effect()
  requestCreateCollection$: Observable<Action> = this._actions$
    .pipe(
      ofType(collectionsConstants.REQUEST_COLLECTION_CREATE),
      map(toPayload),
      switchMap((params) => {
        console.log(params);
        return this._apisService.postCollection(params).pipe(
          map(data => new collectionsActions.RequestCollectionsCreateComplete(data)),
          catchError(error => of(new collectionsActions.RequestCollectionsCreateError(error))));
      }));

  @Effect()
  requestGetCollection$: Observable<Action> = this._actions$
    .pipe(
      ofType(collectionsConstants.REQUEST_COLLECTION),
      map(toPayload),
      switchMap((params) => {
        return this._apisService
          .getCollection(params).pipe(
          map(data => new collectionsActions.RequestCollectionComplete(data)),
          catchError(error => of(new collectionsActions.RequestCollectionError(error))));
      }));

  @Effect()
  requestUpdateCollection$: Observable<Action> = this._actions$
    .pipe(
      ofType(collectionsConstants.REQUEST_COLLECTION_UPDATE),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.putCollection(params).pipe(
          map(data => new collectionsActions.RequestCollectionsUpdateComplete(data)),
          catchError(error => of(new collectionsActions.RequestCollectionsUpdateError(error))));
      }));

  @Effect()
  requestDeleteCollection$: Observable<Action> = this._actions$
    .pipe(
      ofType(collectionsConstants.REQUEST_COLLECTION_DELETE),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.deleteCollection(params).pipe(
          map(data => new collectionsActions.RequestCollectionsDeleteComplete(data)),
          catchError(error => of(new collectionsActions.RequestCollectionsDeleteError(error))));
      }));

  @Effect()
  requestDeleteAnnonceFromCollection$: Observable<Action> = this._actions$
    .pipe(
      ofType(collectionsConstants.REQUEST_DELETE_ANNONCE_FROM_COLLECTION),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .deleteAnnonceFromCollection(params).pipe(
          map(data => {
            console.log(data);
            return new collectionsActions.RequestDeleteAnnonceFromCollectionComplete(data)
          }),
          catchError(error => of(new collectionsActions.RequestDeleteAnnonceFromCollectionError(error))));
      }));
  
  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: CollectionService) { }
}
