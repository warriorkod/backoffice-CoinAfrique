import * as categoriesActions from '../actions/categories';
import * as categoriesConstants from '../constants/categories';

import { Categorie } from '../models/categorie';

export interface State {
  categorie: Categorie;
  categories: Categorie[];
  isPending: boolean;
  error: Object;
}

const categorieInitialState: State = {
  categorie: null,
  categories: null,
  isPending: false,
  error: {}
};

export function reducer(state = categorieInitialState, action: categoriesActions.Actions) {
  switch (action.type) {
    case categoriesConstants.REQUEST_CATEGORIE:
    case categoriesConstants.REQUEST_CATEGORIE_CREATE:
    case categoriesConstants.REQUEST_CATEGORIE_UPDATE:
    case categoriesConstants.REQUEST_CATEGORIE_DELETE:
    case categoriesConstants.REQUEST_CATEGORIES: {
      return Object.assign({}, state, {
        isPending: true
      });

    }
    case categoriesConstants.REQUEST_CATEGORIES_COMPLETE: {
      const new_items = [...action.payload].sort(sortByNomAlphabetically).map(item => {
        const categorie = { ...item };

        categorie.childs = [...item.childs].sort(sortByNomAlphabetically);

        return categorie
      });

      return Object.assign({}, state, {
        categories: new_items,
        isPending: false,
        error: {}
      });
    }

    case categoriesConstants.REQUEST_CATEGORIE_COMPLETE: {
      return Object.assign({}, state, {
        categorie: action.payload,
        isPending: false,
        error: {}
      });
    }
    case categoriesConstants.REQUEST_CATEGORIE_CREATE_COMPLETE: {
      return Object.assign({}, state, {
        categories: [action.payload, ...state.categories],
        isPending: false,
        error: {}
      });
    }
    case categoriesConstants.REQUEST_CATEGORIE_UPDATE_COMPLETE: {
      return Object.assign({}, state, {
        categories: state.categories.map((moderateur) => {
          // tslint:disable-next-line:curly
          if (moderateur.id === action.payload['id'])
            return action.payload;
          return moderateur;
        }),
        isPending: false,
        error: {}
      });
    }
    case categoriesConstants.REQUEST_CATEGORIE_DELETE_COMPLETE: {
      return Object.assign({}, state, {
        categories: state.categories.filter((moderateur) => {
          return moderateur.id !== action.payload['id'];
        }),
        isPending: false,
        error: {}
      });
    }
    case categoriesConstants.REQUEST_CATEGORIE_CREATE_ERROR:
    case categoriesConstants.REQUEST_CATEGORIE_UPDATE_ERROR:
    case categoriesConstants.REQUEST_CATEGORIE_DELETE_ERROR:
    case categoriesConstants.REQUEST_CATEGORIE_ERROR:
    case categoriesConstants.REQUEST_CATEGORIES_ERROR: {
      return Object.assign({}, state, {
        isPending: false,
        error: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

function sortByNomAlphabetically(a: { nom: string }, b: { nom: string }): number {
  if (a.nom < b.nom) {
    return -1;
  }

  if (a.nom > b.nom) {
    return 1;
  }

  return 0;
}


export const getCategorie = (state: State) => state.categorie;
export const getCategories = (state: State) => state.categories;
export const getCategorieStatus = (state: State) => state.isPending;
export const getCategorieError = (state: State) => state.error;
