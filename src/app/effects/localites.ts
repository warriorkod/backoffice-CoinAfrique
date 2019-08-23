import {map, catchError, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import { ApisService } from '../services/apis.service';
import * as localitesConstants from '../constants/localites';
import * as localitesActions from '../actions/localites';
import * as fromRoot from '../reducers';


@Injectable()
export class LocalitesEffects {

  @Effect()
  requestLocalites$: Observable<Action> = this._actions$
    .pipe(
      ofType(localitesConstants.REQUEST_LOCALITES),
      map(toPayload),
      switchMap((params: any) => {
        return this._apisService.getLocalities().pipe(
          map(data => new localitesActions.RequestLocalitesComplete(data)),
          catchError(error => of(new localitesActions.RequestLocalitesError(error))));
    }));

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: ApisService) { }

}
