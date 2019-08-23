import {map, catchError, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import { ApisService } from '../services/apis.service';
import * as paysConstants from '../constants/pays';
import * as paysActions from '../actions/pays';
import * as fromRoot from '../reducers';


@Injectable()
export class PaysEffects {

  @Effect()
  requestPays$: Observable<Action> = this._actions$
    .pipe(
      ofType(paysConstants.REQUEST_PAYS),
      map(toPayload),
      switchMap((params: any) => {
        return this._apisService.getPays().pipe(
          map(data => new paysActions.RequestPaysComplete(data)),
          catchError(error => of(new paysActions.RequestPaysError(error))));
    }));

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: ApisService) { }

}
