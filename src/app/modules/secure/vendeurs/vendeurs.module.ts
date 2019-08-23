import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';

import {VendeursRoutingModule} from './vendeurs-routing.module';

import {VendeursPageComponent} from './containers/vendeurs-page/vendeurs-page.component';
import {VendeurProfileComponent} from './containers/vendeur-profile/vendeur-profile.component';


@NgModule({
  declarations: [
    VendeursPageComponent,
    VendeurProfileComponent,
  ],
  imports: [
    CommonModule,
    VendeursRoutingModule,

    SharedModule,
  ]
})
export class VendeursModule {
}
