import { environment } from '../../environments/environment';

import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromSession from './session';
import * as fromNotifications from './notifications';
import * as fromAnnonces from './annonces';
import * as fromAnnoncesrfu from './annoncesrfu';
import * as fromCategories from './categories';
import * as fromPays from './pays';
import * as fromLocalites from './localites';
import * as fromModerateurs from './moderateurs';
import * as fromFreelancers from './freelancers';
import * as fromCollections from './collections';
import * as fromVendeurs from './vendeurs';
import * as fromActivites from './activites';
import * as fromDashboard from './dashboard';
import * as fromIsahit from './isahit';
import * as fromAudits from './audits';
import * as fromAuth from './auth';
import * as fromRouter from './router';
import * as fromBanner from './banners';
import * as fromVendeursrfu from './vendeursrfu';

export interface State {
  session: fromSession.State;
  notifications: fromNotifications.State;
  annonces: fromAnnonces.State;
  annoncesrfu: fromAnnoncesrfu.State;
  moderateurs: fromModerateurs.State;
  freelancers: fromFreelancers.State;
  pays: fromPays.State;
  localites: fromLocalites.State;
  categories: fromCategories.State;
  collections: fromCollections.State;
  vendeurs: fromVendeurs.State;
  vendeursrfu: fromVendeursrfu.State;
  auth: fromAuth.State;

  // users: fromUsers.State;
  activites: fromActivites.State;
  dashboard: fromDashboard.State;
  isahit: fromIsahit.State
  router: fromRouter.State;
  audits: fromAudits.State;
  banners: fromBanner.State;
}

export const reducers: ActionReducerMap<State> = {
  session: fromSession.reducer,
  notifications: fromNotifications.reducer,
  annonces: fromAnnonces.reducer,
  annoncesrfu: fromAnnoncesrfu.reducer,
  moderateurs: fromModerateurs.reducter,
  freelancers: fromFreelancers.reducter,
  categories: fromCategories.reducer,
  pays: fromPays.reducer,
  localites: fromLocalites.reducer,
  collections: fromCollections.reducer,
  vendeurs: fromVendeurs.reducer,
  activites: fromActivites.reducer,
  dashboard: fromDashboard.reducer,
  isahit: fromIsahit.reducer,
  router: fromRouter.reducer,
  audits: fromAudits.reducer,
  auth: fromAuth.reducer,
  banners: fromBanner.reducer,
  vendeursrfu: fromVendeursrfu.reducer
};

export const metaReducers: MetaReducer<State>[] = environment.production
  ? []
  : [] 

// Selectors for session state.
export const getSessionState = (state: State) => {
  // previous value of session status
  return state.session;
};
export const getSessionStatus = createSelector(
  getSessionState,
  fromSession.getStatus
);
export const getSessionUser = createSelector(
  getSessionState,
  fromSession.getUser
);
export const getSessionError = createSelector(
  getSessionState,
  fromSession.getError
);
export const getSessionConfig = createSelector(
  getSessionState,
  fromSession.getConfig
);

// Selector for notifications state.
export const getMessagesState = (state: State) => state.notifications;
export const getMessages = createSelector(
  getMessagesState,
  fromNotifications.getMessages
);

// Selector for annonces state.
export const getAnnoncesState = (state: State) => state.annonces;
export const getAnnonce = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnonce
);
export const getAnnonceChat = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnonceChat
);
export const getAnnonces = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnonces
);
export const getLocks = createSelector(
  getAnnoncesState,
  fromAnnonces.getLocks
);
export const getAnnoncesNext = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnoncesNext
);
export const getAnnoncesPrev = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnoncesPrev
);
export const getAnnonceStatus = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnonceStatus
);
export const getAnnoncesStats = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnoncesStats
);
export const getAnnonceError = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnonceError
);
export const getAnnoncesCount = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnoncesCount
);


// Selector for annoncesrfu state.
export const getAnnoncesRfuState = (state: State) => state.annoncesrfu;
export const getAnnonceRfu = createSelector(
  getAnnoncesRfuState,
  fromAnnoncesrfu.getAnnonceRfu
);

export const getAnnoncesRfu = createSelector(
  getAnnoncesRfuState,
  fromAnnoncesrfu.getAnnoncesRfu
);
export const getRfuLocks = createSelector(
  getAnnoncesRfuState,
  fromAnnoncesrfu.getRfuLocks
);
export const getAnnoncesRfuNext = createSelector(
  getAnnoncesRfuState,
  fromAnnoncesrfu.getAnnoncesRfuNext
);
export const getAnnoncesRfuPrev = createSelector(
  getAnnoncesRfuState,
  fromAnnoncesrfu.getAnnoncesRfuPrev
);
export const getAnnonceRfuStatus = createSelector(
  getAnnoncesRfuState,
  fromAnnoncesrfu.getAnnonceRfuStatus
);

export const getAnnonceRfuError = createSelector(
  getAnnoncesRfuState,
  fromAnnoncesrfu.getAnnonceRfuError
);
export const getAnnoncesRfuCount = createSelector(
  getAnnoncesRfuState,
  fromAnnoncesrfu.getAnnoncesRfuCount
);



// Selector for categorie state.
export const getCategoriesState = (state: State) => state.categories;
export const getCategorie = createSelector(
  getCategoriesState,
  fromCategories.getCategorie
);
export const getCategories = createSelector(
  getCategoriesState,
  fromCategories.getCategories
);
export const getCategorieStatus = createSelector(
  getCategoriesState,
  fromCategories.getCategorieStatus
);
export const getCategorieError = createSelector(
  getCategoriesState,
  fromCategories.getCategorieError
);

// Selector for moderateur state.
export const getModerateursState = (state: State) => state.moderateurs;
export const getModerateur = createSelector(
  getModerateursState,
  fromModerateurs.getModerateur
);
export const getModerateurs = createSelector(
  getModerateursState,
  fromModerateurs.getModerateurs
);
export const getModerateurStatus = createSelector(
  getModerateursState,
  fromModerateurs.getModerateurStatus
);
export const getModerateurError = createSelector(
  getModerateursState,
  fromModerateurs.getModerateurError
);

//Selector for freelancer state
export const getFreelancersState = (state: State) => state.freelancers;
export const getFreelancer = createSelector(
  getFreelancersState,
  fromFreelancers.getFreelancer
);
export const getFreelancers = createSelector(
  getFreelancersState,
  fromFreelancers.getFreelancers
);
export const getFreelancerStatus = createSelector(
  getFreelancersState,
  fromFreelancers.getFreelancerStatus
);
export const getFreelancerError = createSelector(
  getFreelancersState,
  fromFreelancers.getFreelancerError
);
export const getFreelancerEvents = createSelector(
  getFreelancersState,
  fromFreelancers.getFreelancerEvents
);

export const getPaysState = (state: State) => state.pays;
export const getPays = createSelector(getPaysState, fromPays.getPays);
export const getPaysStatus = createSelector(
  getPaysState,
  fromPays.getPaysStatus
);
export const getPaysError = createSelector(getPaysState, fromPays.getPaysError);

//selector for localites
export const getLocalitesState = (state: State) => state.localites;
export const getLocalites = createSelector(getLocalitesState, fromLocalites.getLocalites);
export const getLocalitesStatus = createSelector(
  getLocalitesState,
  fromLocalites.getLocalitesStatus
);
export const getLocalitesError = createSelector(getLocalitesState, fromLocalites.getLocalitesError);


// Selector for collection state.
export const getCollectionsState = (state: State) => state.collections;
export const getCollection = createSelector(
  getCollectionsState,
  fromCollections.getCollection
);
export const getCollections = createSelector(
  getCollectionsState,
  fromCollections.getCollections
);
export const getCollectionStatus = createSelector(
  getCollectionsState,
  fromCollections.getCollectionStatus
);
export const getCollectionError = createSelector(
  getCollectionsState,
  fromCollections.getCollectionError
);

// Selector for banners state
export const getBannersState = (state: State) => state.banners;
export const getBanners = createSelector(
  getBannersState,
  fromBanner.getBanners
)
export const getBanner = createSelector(
  getBannersState,
  fromBanner.getBanner
)
export const getBannersError = createSelector(
  getBannersState,
  fromBanner.getBannersError
)
export const getBannerStatus = createSelector(
  getBannersState,
  fromBanner.getBannerStatus
)
export const getPreSignedUrl = createSelector(
  getBannersState,
  fromBanner.getPreSignedUrl
)

export const getBannersCount = createSelector(
  getBannersState,
  fromBanner.getBannersCount
)
export const getBannersNext = createSelector(
  getBannersState,
  fromBanner.getBannersNext
)
export const getBannersPrev = createSelector(
  getBannersState,
  fromBanner.getBannersPrev
)

// Selector for vendeurs state.
export const getVendeursState = (state: State) => state.vendeurs;
export const getVendeur = createSelector(
  getVendeursState,
  fromVendeurs.getVendeur
);
export const getVendeurs = createSelector(
  getVendeursState,
  fromVendeurs.getVendeurs
);
export const getVendeursExport = createSelector(
  getVendeursState,
  fromVendeurs.getVendeursExport
);
export const getVendeursNext = createSelector(
  getVendeursState,
  fromVendeurs.getVendeursNext
);
export const getVendeursPrev = createSelector(
  getVendeursState,
  fromVendeurs.getVendeursPrev
);
export const getVendeurStatus = createSelector(
  getVendeursState,
  fromVendeurs.getVendeurStatus
);

export const getVendeurError = createSelector(
  getVendeursState,
  fromVendeurs.getVendeurError
);
export const getVendeursCount = createSelector(
  getVendeursState,
  fromVendeurs.getVendeursCount
);

// Selector for activites state.
export const getActivitesState = (state: State) => state.activites;
export const getActivite = createSelector(
  getActivitesState,
  fromActivites.getActivite
);
export const getActivites = createSelector(
  getActivitesState,
  fromActivites.getActivites
);
export const getActivitesNext = createSelector(
  getActivitesState,
  fromActivites.getActivitesNext
);
export const getActivitesPrev = createSelector(
  getActivitesState,
  fromActivites.getActivitesPrev
);
export const getActiviteStatus = createSelector(
  getActivitesState,
  fromActivites.getActiviteStatus
);

export const getActiviteError = createSelector(
  getActivitesState,
  fromActivites.getActiviteError
);
export const getActivitesCount = createSelector(
  getActivitesState,
  fromActivites.getActivitesCount
);

export const getDashboardState = (state: State) => state.dashboard;
export const getKeywords = createSelector(
  getDashboardState,
  fromDashboard.getKeywords
);

export const getData = createSelector(
  getDashboardState,
  fromDashboard.getData
);

export const getIsahitState = (state: State) => state.isahit;
export const getIsahitToken = createSelector(
  getIsahitState,
  fromIsahit.getIsahitToken
);

export const getIsahitTask = createSelector(
  getIsahitState,
  fromIsahit.getIsahitTask
);

export const getIsahitError = createSelector(
  getIsahitState,
  fromIsahit.getIsahitError
);

export const getListAudits = (state: State) => state.audits;
export const getListAuditsError = createSelector(
  getListAudits,
  fromAudits.getListAuditsError
)
export const getListAuditsStatus = createSelector(
  getListAudits,
  fromAudits.getListAuditsStatus
)

//Section for auth
export const getAuthState = (state: State) => state.auth;
export const getAuthError = createSelector(
  getAuthState,
  fromAuth.getAuthError
)
export const getAuthStatus = createSelector(
  getAuthState,
  fromAuth.getAuthStatus
)

// Selector for vendeursrfu state.
export const getVendeursRfuState = (state: State) => state.vendeursrfu;
export const getVendeurRfu = createSelector(
  getVendeursRfuState,
  fromVendeursrfu.getVendeurRfu
);
export const getVendeursRfu = createSelector(
  getVendeursRfuState,
  fromVendeursrfu.getVendeursRfu
);
export const getVendeursRfuExport = createSelector(
  getVendeursRfuState, 
  fromVendeursrfu.getVendeursRfuExport
);
export const getVendeursRfuNext = createSelector(
  getVendeursRfuState,
  fromVendeursrfu.getVendeursRfuNext
);
export const getVendeursRfuPrev = createSelector(
  getVendeursRfuState,
  fromVendeursrfu.getVendeursRfuPrev
);
export const getVendeurRfuStatus = createSelector(
  getVendeursRfuState,
  fromVendeursrfu.getVendeurRfuStatus
);

export const getVendeurRfuError = createSelector(
  getVendeursRfuState,
  fromVendeursrfu.getVendeurRfuError
);
export const getVendeursRfuCount = createSelector(
  getVendeursRfuState,
  fromVendeursrfu.getVendeursRfuCount
);
