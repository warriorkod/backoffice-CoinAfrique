import { TestBed, async } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { PipesModule } from './pipes';

import { AppComponent } from './app.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { CategoriesPageComponent } from './containers/categories-page/categories-page.component';
import { CollectionsPageComponent } from './containers/collections-page/collections-page.component';
import { PremiumPageComponent } from 'app/containers/premium-page/premium-page.component';
import { CommerciauxPageComponent } from './containers/commerciaux-page/commerciaux-page.component';
import { ModerateursPageComponent } from './containers/moderateurs-page/moderateurs-page.component';

import { ComponentsModule } from './components/index';

import { RouterModule } from '@angular/router';
import { routes } from './routes';

import { LoadingModule } from 'ngx-loading';
import { APP_BASE_HREF } from '@angular/common';
import { ApisService } from './services/apis.service';
import {AnnoncesPageComponent} from './modules/secure/annonces/containers/annonces-page/annonces-page.component';
import {SignInComponent} from './modules/auth/containers/sign-in/sign-in.component';
import {AnnonceEditComponent} from './modules/secure/annonces/containers/annonce-edit/annonce-edit.component';
import {VendeursPageComponent} from './modules/secure/vendeurs/containers/vendeurs-page/vendeurs-page.component';
import {VendeurProfileComponent} from './modules/secure/vendeurs/containers/vendeur-profile/vendeur-profile.component';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SignInComponent,
        AnnoncesPageComponent,
        CollectionsPageComponent,
        CategoriesPageComponent,
        AnnonceEditComponent,
        PremiumPageComponent,
        VendeursPageComponent,
        VendeurProfileComponent,
        CommerciauxPageComponent,
        ModerateursPageComponent,
        DashboardComponent
      ],
      imports: [
        ComponentsModule,
        LoadingModule,
        FormsModule,
        HttpClientModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        PipesModule,
        NgxChartsModule,
        ComponentsModule,
        Daterangepicker,
        LoadingModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, ApisService]
    }).compileComponents();
  }));

  fit('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // xit(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // xit('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
