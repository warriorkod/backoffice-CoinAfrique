import {catchError, switchMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as authConstants from '../constants/auth';
import * as authActions from '../actions/auth';
import { AuthService } from '../services';

@Injectable()
export class AuthEffects {
    @Effect()
        requestMakeSync$: Observable<Action> = this._actions$
        .pipe(
        ofType(authConstants.REQUEST_MAKE_SYNC),
        map(toPayload),
        switchMap(params => {
            return this._apisService
            .synchroniser(params).pipe(
            map(
                (data: any) =>
                new authActions.RequestMakeSyncComplete(data)
            ),
            catchError(error =>
                of(new authActions.RequestMakeSyncError(error))
            ),);
        }));

    constructor(
		private _actions$: Actions,
		private _store: Store<fromRoot.State>,
		private _apisService: AuthService
	) { }

}