import * as routerActions from '../actions/router';
import * as routerConstants from '../constants/router';
import { NavigationExtras } from '@angular/router';

import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';


export interface State {
  path: string;
  query?: any;
  extras?: NavigationExtras;
};

const routerInitialState: State = {
  path: ''
};

export function reducer(state = routerInitialState, action: routerActions.Actions) {
  switch (action.type) {
    case routerConstants.GO:
    // case routerConstants.BACK:
    // case routerConstants.FORWARD:
      return Object.assign({}, state, {
        path: action.payload['path'],
        query: action.payload['query'],
        extras: action.payload['extras']
      });
    default:
      return state;
  }
}

export const getRouters = (state: State) => state.path;

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}