import {catchError, switchMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";
import { UUID } from 'angular2-uuid';

import swal from 'sweetalert';
import { ModerateurService } from '../services/moderateur.service';
import * as fromRoot from '../reducers';
import * as moderateursConstants from '../constants/moderateurs';
import * as moderateursActions from '../actions/moderateurs';
import * as notificationsActions from '../actions/notifications';


@Injectable()
export class ModerateursEffects {

  @Effect()
  requestModerateurs$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEURS),
      map(toPayload),
      switchMap(() => {
        return this._apisService.getModerateurs().pipe(
          map(data => new moderateursActions.RequestModerateursComplete(data)),
          catchError(error => of(new moderateursActions.RequestModerateursError(error))));
      }));

  @Effect()
  requestGetModerateur$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.getModerateur(params).pipe(
          map(data => new moderateursActions.RequestModerateurComplete(data)),
          catchError(error => of(new moderateursActions.RequestModerateurError(error))));
      }));

  @Effect()
  createModerateur$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_CREATE),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.createModerateur(params).pipe(
          map(data => new moderateursActions.RequestCreateModerateurComplete(data)),
          catchError(error => of(new moderateursActions.RequestCreateModerateurError(error))));
      }));

  @Effect()
  updateModerateur$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_UPDATE),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.updateModerateur(params).pipe(
          map(data => new moderateursActions.RequestUpdateModerateurComplete(data)),
          catchError(error => of(new moderateursActions.RequestUpdateModerateurError(error))));
      }));

  @Effect()
  updateProfile$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_PROFILE_UPDATE),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.updateModerateur(params).pipe(
          map(data => new moderateursActions.RequestUpdateModerateurProfileComplete(data)),
          catchError(error => of(new moderateursActions.RequestUpdateModerateurProfileError(error))));
      }));

  @Effect()
  updatePassword$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_PASSWORD),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.updateModerateurPassword(params).pipe(
          map(data => new moderateursActions.RequestUpdateModerateurPasswordComplete(data)),
          catchError((error) => of(new moderateursActions.RequestUpdateModerateurPasswordError(error))));
      }));

  @Effect()
  deleteModerateur$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_DELETE),
      map(params => {
        swal({
          title: 'Êtes-vous sûr de vouloir effacer cet enregistrement?',
          text: 'Cliquer en dehors de la boite de dialogue pour le fermer.',
          icon: 'error',
          dangerMode: true,
        })
        .then(willDelete => {
          if (willDelete) {
            this._apisService.deleteModerateur(params['payload'])
              .subscribe(
                response => this._store.dispatch(new moderateursActions.RequestDeleteModerateurComplete(params)),
                error => this._store.dispatch(new moderateursActions.RequestDeleteModerateurError(error))
              );
          } else {
            this._store.dispatch(new moderateursActions.RequestDeleteModerateurCanceled());
          }
        });

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
      }));

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: ModerateurService) { }

}
