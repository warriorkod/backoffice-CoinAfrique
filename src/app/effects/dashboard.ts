import {switchMap, map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { toPayload } from "./utils";

import { ApisService } from '../services/apis.service';
import * as dashboardConstants from '../constants/dashboard';
import * as dashboardActions from '../actions/dashboard';
import * as fromRoot from '../reducers';

@Injectable()
export class DashboardEffects {

  @Effect()
  requestDashboardKeyword$: Observable<Action> = this._actions$
    .pipe(
      ofType(dashboardConstants.REQUEST_CHART_KEYWORD),
      map(toPayload),
      switchMap(() => {
        return this._apisService
          .getKeywordsCloud().pipe(
          map(data => new dashboardActions.RequestChartKeywordComplete(data)),
          catchError(error => of(new dashboardActions.RequestChartKeywordError(error))));
      }));

  @Effect()
  requestDashboardData$: Observable<Action> = this._actions$
    .pipe(
      ofType(dashboardConstants.REQUEST_CHART_DATA),
      map(toPayload),
      switchMap(() => {
        return this._apisService
          .getDashboardData().pipe(
          map(data => new dashboardActions.RequestChartDataComplete(data)),
          catchError(error => of(new dashboardActions.RequestChartDataError(error))));
      }));

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: ApisService
  ) { }
}
