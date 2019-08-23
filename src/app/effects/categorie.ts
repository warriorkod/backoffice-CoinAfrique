import {catchError, switchMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import * as categoriesConstants from '../constants/categories';
import * as categoriesActions from '../actions/categories';
import * as fromRoot from '../reducers';
import { CategorieService } from '../services';


@Injectable()
export class CategoriesEffects {

  @Effect()
  requestCategorie$: Observable<Action> = this._actions$
    .pipe(
      ofType(categoriesConstants.REQUEST_CATEGORIE),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.getCategorie(params).pipe(
          map(data => new categoriesActions.RequestCategorieComplete(data)),
          catchError(error => of(new categoriesActions.RequestCategorieError(error))));
      }));

  @Effect()
  requestCategories$: Observable<Action> = this._actions$
    .pipe(
      ofType(categoriesConstants.REQUEST_CATEGORIES),
      map(toPayload),
      switchMap((params) => {
        return this._apisService
          .getCategories().pipe(
          map(data => new categoriesActions.RequestCategoriesComplete(data)),
          catchError(error => of(new categoriesActions.RequestCategoriesError(error))));
      }));

  @Effect()
  requestCreateCategorie$: Observable<Action> = this._actions$
    .pipe(
      ofType(categoriesConstants.REQUEST_CATEGORIE_CREATE),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.postCategorie(params).pipe(
          map(data => new categoriesActions.RequestCategoriesCreateComplete(data)),
          catchError(error => of(new categoriesActions.RequestCategoriesCreateError(error))));
      }));

  @Effect()
  requestUpdateCategories$: Observable<Action> = this._actions$
    .pipe(
      ofType(categoriesConstants.REQUEST_CATEGORIE_UPDATE),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.putCategorie(params).pipe(
          map(data => new categoriesActions.RequestCategoriesUpdateComplete(data)),
          catchError(error => of(new categoriesActions.RequestCategoriesUpdateError(error))));
      }));

  @Effect()
  requestDeleteCategories$: Observable<Action> = this._actions$
    .pipe(
      ofType(categoriesConstants.REQUEST_CATEGORIE_DELETE),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.deleteCategorie(params).pipe(
          map(data => new categoriesActions.RequestCategoriesDeleteComplete(params)),
          catchError(error => of(new categoriesActions.RequestCategoriesDeleteError(error))));
      }));

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: CategorieService) { }

}
