import {switchMap, map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";
import { Observable ,  of } from 'rxjs';
import * as routerActions from '../actions/router';

import * as sessionConstants from '../constants/sessions';
import * as sessionActions from '../actions/session';
import * as fromRoot from '../reducers';
import { SessionService } from '../services';
const jwtDecode = require('jwt-decode');

@Injectable()
export class SessionEffects {

  @Effect()
  requestOauth$: Observable<Action> = this._actions$
    .pipe(
      ofType(sessionConstants.REQUEST_OAUTH),
      map(toPayload),
      switchMap((params) => {
        return this._apisService.postOauth(params).pipe(
          map((data: any) => {
            const parsedToken = jwtDecode(data['auth_token']);
            if (data.auth_token && data.status === 'success') {
            // if (data.auth_token && data.status === 'success') {
              localStorage.setItem('bo::token', data.auth_token);
              localStorage.setItem('bo::token_expire', parsedToken.exp);
              localStorage.setItem('bo::role', parsedToken.role);
              localStorage.setItem('bo::user_id', parsedToken.sub);
              localStorage.setItem('bo::first_name', parsedToken.firstname);
              localStorage.setItem('bo::last_name', parsedToken.lastname);
              localStorage.setItem('bo::user', JSON.stringify(parsedToken));
              const user = data.parsedToken;
              return new sessionActions.RequestOauthCompleteAction(user);
            } else return new sessionActions.RequestOauthErrorAction(data);
          }),
          catchError((error) => of(new sessionActions.RequestOauthErrorAction(error))));
  }));

  @Effect()
  destroyOauth$: Observable<Action> = this._actions$
    .pipe(
      ofType(sessionConstants.REQUEST_DESTROY_OAUTH),
      map(toPayload),
      switchMap(() => {
        return this._apisService.destroyAuth().pipe(
          map(() => {
            localStorage.clear();
            this._store.dispatch(new routerActions.Go({path: ['sign_in']}));
            return new sessionActions.RequestDestroyOauthCompleteAction({});
          }),
          catchError((error) => of(new sessionActions.RequestDestroyOauthErrorAction(error))));
      }));

  constructor(private _actions$: Actions,
    private _apisService: SessionService,
    private _store: Store<fromRoot.State>) { }
}
