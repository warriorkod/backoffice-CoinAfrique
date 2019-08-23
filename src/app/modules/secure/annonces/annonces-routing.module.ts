import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppGuard} from '../../../guards/is-authenticated';

import {AnnonceEditComponent} from './containers/annonce-edit/annonce-edit.component';
import {AnnoncesPageComponent} from './containers/annonces-page/annonces-page.component';

const routes: Routes = [
  {
    path: '',
    component: AnnoncesPageComponent,
    canActivate: [AppGuard],

  },
  {
    path: ':id/edit',
    component: AnnonceEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AnnoncesRoutingModule {
}
