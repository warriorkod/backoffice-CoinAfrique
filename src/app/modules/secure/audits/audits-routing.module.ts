import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ModerateurProfileComponent} from './containers/moderateur-profile/moderateur-profile.component';
import {AuditAnnonceComponent} from './containers/audit-annonce/audit-annonce.component';

const routes: Routes = [
  {
    path: 'user/:id',
    component: ModerateurProfileComponent,
  },
  {
    path: 'ad/:id',
    component: AuditAnnonceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditsRoutingModule { }
