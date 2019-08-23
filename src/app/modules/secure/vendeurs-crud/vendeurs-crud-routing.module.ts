import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendeursRfuComponent } from './containers/vendeurs-rfu/vendeurs-rfu.component';
import { VendeurRfuProfileComponent } from './containers/vendeur-rfu-profile/vendeur-rfu-profile.component';


const routes: Routes = [
	  {
    path: '',
    component: VendeursRfuComponent,
  },
  {
    path: ':id',
    component: VendeurRfuProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendeursCrudRoutingModule { }
