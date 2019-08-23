import {map, catchError, switchMap} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as activitesConstants from '../constants/activite';
import * as activitesActions from '../actions/activites';
import * as fromRoot from '../reducers';
import { VendeurService } from '../services';
import { toPayload } from './utils';

@Injectable()
export class ActivitesEffects {


  @Effect()
  requestActivites$: Observable<Action> = this._actions$
    .pipe(
      ofType(activitesConstants.REQUEST_ACTIVITES),
      map(toPayload),
      switchMap(params => {
        return this._apisService
          .getActivites(params)
          .pipe(
            map(data => new activitesActions.RequestActivitesComplete(data)),
            catchError(error => of(new activitesActions.RequestActivitesError(error))),);
      }));

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: VendeurService
  ) { }
}
