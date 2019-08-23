import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {VendeursPageComponent} from './containers/vendeurs-page/vendeurs-page.component';
import {VendeurProfileComponent} from './containers/vendeur-profile/vendeur-profile.component';


const routes: Routes = [
  {
    path: '',
    component: VendeursPageComponent,
  },
  {
    path: ':id',
    component: VendeurProfileComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendeursRoutingModule { }
