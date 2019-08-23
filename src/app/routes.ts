import { Routes } from '@angular/router';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { CollectionsPageComponent } from './containers/collections-page/collections-page.component';
import { CategoriesPageComponent } from './containers/categories-page/categories-page.component';
// import { CommerciauxPageComponent } from './containers/commerciaux-page/commerciaux-page.component';
import { ModerateursPageComponent } from './containers/moderateurs-page/moderateurs-page.component';
import { FreelancersPageComponent } from './containers/freelancers-page/freelancers-page.component';

import { AppGuard } from './guards/is-authenticated';
import { AdminOnly } from './guards/admin-only';
import { PremiumPageComponent } from 'app/containers/premium-page/premium-page.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { IsahitPageComponent } from './containers/isahit-page/isahit-page.component';
import { AdLocationComponent } from './containers/ad-location/ad-location.component';

export const routes: Routes = [
  {
    path: 'sign_in',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'app',
    component: DashboardComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'annonces',
    canActivate: [AppGuard],
    loadChildren: () => import('./modules/secure/annonces/annonces.module').then(mod => mod.AnnoncesModule)
  },
  {
    path: 'vendeurs',
    canActivate: [AppGuard],
    loadChildren: () => import('./modules/secure/vendeurs/vendeurs.module').then(mod => mod.VendeursModule)
  },
  {
    path: 'vendeursrfu',
    canActivate: [AppGuard],
    loadChildren: () => import('./modules/secure/vendeurs-crud/vendeurs-crud.module').then(mod => mod.VendeursCrudModule)
  },
  // {
  //   path: 'users',
  //   canActivate: [AppGuard],
  //   loadChildren: () => import('./modules/secure/users/users.module').then(mod => mod.UsersModule)
  // },
  {
    path: 'audits',
    canActivate: [AppGuard, AdminOnly],
    loadChildren: () => import('./modules/secure/audits/audits.module').then(mod => mod.AuditsModule)
  },
  {
    path: 'premium',
    component: PremiumPageComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'collections',
    component: CollectionsPageComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'categories',
    component: CategoriesPageComponent,
    canActivate: [AppGuard, AdminOnly]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AppGuard]
  },
  // {
  //   path: 'commerciaux',
  //   component: CommerciauxPageComponent,
  //   canActivate: [AppGuard]
  // },
  {
    path: 'moderateurs',
    component: ModerateursPageComponent,
    canActivate: [AppGuard, AdminOnly]
  },
  {
    path: 'freelancers',
    component: FreelancersPageComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'isahit',
    component: IsahitPageComponent,
    canActivate: [AppGuard, AdminOnly]
  },
  {
    path: 'adlocation',
    component: AdLocationComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'banners',
    canActivate: [AppGuard],
    loadChildren: () => import('./modules/secure/banners/banners.module').then(mod => mod.BannersModule)
  },
  {
    path: '**',
    redirectTo: '/app',
    pathMatch: 'full'
  }
];
