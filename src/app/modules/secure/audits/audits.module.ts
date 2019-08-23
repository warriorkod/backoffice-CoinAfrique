import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';

import {AuditsRoutingModule} from './audits-routing.module';

import {ModerateurProfileComponent} from './containers/moderateur-profile/moderateur-profile.component';
import {AuditAnnonceComponent} from './containers/audit-annonce/audit-annonce.component';

@NgModule({
  declarations: [
    ModerateurProfileComponent,
    AuditAnnonceComponent,
  ],
  imports: [
    CommonModule,
    AuditsRoutingModule,

    SharedModule
  ]
})
export class AuditsModule {
}
