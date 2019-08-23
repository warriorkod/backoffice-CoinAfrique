import {catchError, map, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import { ModerateurService } from '../services/moderateur.service';
import * as fromRoot from '../reducers';
import * as freelancersConstants from '../constants/freelancers';
import * as freelancersActions from '../actions/freelancers';


@Injectable()
export class FreelancersEffects {

  @Effect()
  requestFreelancers$: Observable<Action> = this._actions$
    .pipe(
      ofType(freelancersConstants.REQUEST_FREELANCERS),
      map(toPayload),
      switchMap(() => {
        return this._apisService.getFreelancers().pipe(
          map(data => {
            console.log(data);
            return new freelancersActions.RequestFreelancersComplete(data)
          }),
          catchError(error => of(new freelancersActions.RequestFreelancersError(error))));
      }));

  @Effect()
  requestGetFreelancer$: Observable<Action> = this._actions$
    .pipe(
      ofType(freelancersConstants.REQUEST_FREELANCER),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.getFreelancer(params).pipe(
          map(data => new freelancersActions.RequestFreelancerComplete(data)),
          catchError(error => of(new freelancersActions.RequestFreelancerError(error))));
      }));

  @Effect()
  requestGetFreelancerEvents$: Observable<Action> = this._actions$
    .pipe(
      ofType(freelancersConstants.REQUEST_FREELANCER_EVENTS),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.getFreelancerEvents(params).pipe(
          map(data => {
            console.log(data);
            return new freelancersActions.RequestFreelancerEventsComplete(data)
          }),
          catchError(error => of(new freelancersActions.RequestFreelancerEventsError(error))));
      }));

//   @Effect()
//   createModerateur$: Observable<Action> = this._actions$
//     .ofType(freelancersConstants.REQUEST_FREELANCER_CREATE)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.createModerateur(params)
//         .map(data => new freelancersActions.RequestCreateFreelancerComplete(data))
//         .catch(error => of(new freelancersActions.RequestCreateFreelancerError(error)));
//     });

//   @Effect()
//   updateModerateur$: Observable<Action> = this._actions$
//     .ofType(freelancersConstants.REQUEST_FREELANCER_UPDATE)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.updateModerateur(params)
//         .map(data => new freelancersActions.RequestUpdateFreelancerComplete(data))
//         .catch(error => of(new freelancersActions.RequestUpdateFreelancerError(error)));
//     });

//   @Effect()
//   updateProfile$: Observable<Action> = this._actions$
//     .ofType(freelancersConstants.REQUEST_FREELANCER_PROFILE_UPDATE)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.updateModerateur(params)
//         .map(data => new freelancersActions.RequestUpdateFreelancerProfileComplete(data))
//         .catch(error => of(new freelancersActions.RequestUpdateFreelancerProfileError(error)));
//     });

//   @Effect()
//   updatePassword$: Observable<Action> = this._actions$
//     .ofType(freelancersConstants.REQUEST_FREELANCER_PASSWORD)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.updateModerateurPassword(params)
//         .map(data => new freelancersActions.RequestUpdateFreelancerPasswordComplete(data))
//         .catch((error) => of(new freelancersActions.RequestUpdateFreelancerPasswordError(error)));
//     });

//   @Effect()
//   deleteModerateur$: Observable<Action> = this._actions$
//     .ofType(freelancersConstants.REQUEST_FREELANCER_DELETE)
//     .map(params => {
//       swal({
//         title: 'Êtes-vous sûr de vouloir effacer cet enregistrement?',
//         text: 'Cliquer en dehors de la boite de dialogue pour le fermer.',
//         icon: 'error',
//         dangerMode: true,
//       })
//         .then(willDelete => {
//           if (willDelete) {
//             this._apisService.deleteModerateur(params['payload'])
//               .subscribe(
//                 response => {
//                   console.log('response', response);
//                   console.log('sucess');
//                   this._store.dispatch(new freelancersActions.RequestDeleteFreelancerComplete(params));
//                 },
//                 error => {
//                   console.log(error);
//                   console.log('error');
//                   this._store.dispatch(new freelancersActions.RequestDeleteFreelancerError(error));
//                 });
//             // .map(data => this._store.dispatch(new freelancersActions.RequestDeleteModerateurComplete(data)))
//             // .catch(error => of(this._store.dispatch(new freelancersActions.RequestDeleteModerateurError(error))));
//           } else {
//             this._store.dispatch(new freelancersActions.RequestDeleteFreelancerCanceled());
//           }
//         });
//       return new notificationsActions.NotifyUser({
//         uuid: UUID.UUID(),
//         type: 'success',
//         title: 'Succès :-)',
//         text: 'Votre annonce a été modifié avec succés!'
//       });



//     });

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: ModerateurService) { }

}
