import 'zone.js';
import 'reflect-metadata';

import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import * as Raven from 'raven-js';
import { environment } from '../environments/environment';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { AdLocationService } from './containers/ad-location/ad-location.service';
import { AgmCoreModule } from "@agm/core";
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { SharedModule } from './modules/shared/shared.module';

export declare let require: any;

if (environment.production) {
  Raven
    .config('https://a19b70cc5df34d12b99266003b6b1e76@sentry.io/1307331')
    .install()
    .setEnvironment(environment.NAME);
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    Raven.captureException(error.originalError || error);
    throw error;
  }
}

import {
  ImageCompressService,
  ResizeOptions,
} from 'ng2-image-compress';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from 'app/reducers/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/index';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataTablesModule } from 'angular-datatables';

import { PipesModule } from './pipes';

// Effects & Services
import { ApisService } from './services/apis.service';
import { SessionEffects } from './effects/session';
import { NotificationsEffects } from './effects/notifications';
import { CategoriesEffects } from './effects/categorie';
import { AnnoncesEffects } from './effects/annonces';
import { AnnoncesRfuEffects } from './effects/annoncesrfu';
import { PaysEffects } from './effects/pays';
import { LocalitesEffects } from './effects/localites';
import { CollectionsEffects } from './effects/collections';
import { DashboardEffects } from 'app/effects/dashboard';
import { VendeursEffects } from 'app/effects/vendeur';
import { VendeursRfuEffects } from 'app/effects/vendeursrfu';
import { ActivitesEffects } from 'app/effects/activite';
import { AuditsEffects } from 'app/effects/audit';
import { ModerateursEffects } from 'app/effects/moderateur';
import { FreelancersEffects } from 'app/effects/freelancer';
import { IsahitEffects } from 'app/effects/isahit';
import { RouterEffects } from 'app/effects/router';
import { ModalEffects } from './effects/modals';
import { BannersEffects } from './effects/banners';
import { AppGuard } from './guards/is-authenticated';
import { AdminOnly } from './guards/admin-only';
import { Daterangepicker } from 'ng2-daterangepicker';
import { reducers, metaReducers } from './reducers';
import { routes } from './routes';

// Components
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { CategoriesPageComponent } from './containers/categories-page/categories-page.component';
import { CollectionsPageComponent } from './containers/collections-page/collections-page.component';
import { PremiumPageComponent } from 'app/containers/premium-page/premium-page.component';
import { CommerciauxPageComponent } from './containers/commerciaux-page/commerciaux-page.component';
import { ModerateursPageComponent } from './containers/moderateurs-page/moderateurs-page.component';
import { FreelancersPageComponent } from './containers/freelancers-page/freelancers-page.component';
import { AnnonceService, SessionService, CollectionService, CategorieService, ModerateurService, IsahitService, AnnonceLockService, AuthService, AnnonceRfuService, VendeursrfuService } from './services';
import { LockService } from './services/lock.service';
import { AuditService } from './services/audit.service';
import { VendeurService } from './services/vendeur.service';
import { CountryService } from './services/country.service';
import { BannersService } from "./services/banners.service";
import { ProfileComponent } from './containers/profile/profile.component';
import { IsahitPageComponent } from './containers/isahit-page/isahit-page.component';
import { AdLocationComponent } from './containers/ad-location/ad-location.component';
import { AuthEffects } from './effects/auth';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoriesPageComponent,
    CollectionsPageComponent,
    PremiumPageComponent,
    CommerciauxPageComponent,
    ProfileComponent,
    ModerateursPageComponent,
    FreelancersPageComponent,
    IsahitPageComponent,
    IsahitPageComponent,
    AdLocationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    PipesModule,
    ComponentsModule,
    ChartsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    DataTablesModule,
    Daterangepicker,
    Ng2ImgMaxModule,
    RouterModule.forRoot(routes, { useHash: false, enableTracing: false }),
    StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
    AgmCoreModule.forRoot({
      apiKey: environment.AGM_API_KEY
    }),
    AgmJsMarkerClustererModule,
    SharedModule,
    EffectsModule.forRoot([
      SessionEffects,
      AnnoncesEffects,
      AnnoncesRfuEffects,
      CategoriesEffects,
      PaysEffects,
      LocalitesEffects,
      DashboardEffects,
      VendeursEffects,
      ActivitesEffects,
      CollectionsEffects,
      NotificationsEffects,
      ModerateursEffects,
      FreelancersEffects,
      IsahitEffects,
      AuditsEffects,
      ModalEffects,
      RouterEffects,
      BannersEffects,
      AuthEffects,
      VendeursRfuEffects
    ]),
  ],
  providers: [
    AdminOnly,
    AnnonceService,
    IsahitService,
    ApisService,
    AppGuard,
    AuditService,
    CategorieService,
    CollectionService,
    CountryService,
    ImageCompressService,
    LockService,
    ModerateurService,
    ResizeOptions,
    SessionService,
    VendeurService,
    AnnonceLockService,
    AdLocationService,
    BannersService,
    AuthService,
    AnnonceRfuService,
    VendeursrfuService,
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
],
  bootstrap: [AppComponent],
  exports: [PipesModule]
})
export class AppModule { }
