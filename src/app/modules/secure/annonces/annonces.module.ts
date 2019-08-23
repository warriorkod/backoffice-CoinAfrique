import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';

import {AnnoncesRoutingModule} from './annonces-routing.module';

import {AnnoncesPageComponent} from './containers/annonces-page/annonces-page.component';
import {AnnonceEditComponent} from './containers/annonce-edit/annonce-edit.component';
import {AnnonceFormComponent} from './components/annonce-form/annonce-form.component';

@NgModule({
  declarations: [
    AnnoncesPageComponent,
    AnnonceEditComponent,
    AnnonceFormComponent
  ],
  imports: [
    CommonModule,
    AnnoncesRoutingModule,

    SharedModule,
  ]
})
export class AnnoncesModule {
}
