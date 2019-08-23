import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { VendeursCrudRoutingModule } from './vendeurs-crud-routing.module';
import { VendeursRfuComponent } from './containers/vendeurs-rfu/vendeurs-rfu.component';
import { DataTablesModule } from 'angular-datatables';
import { VendeurRfuProfileComponent } from './containers/vendeur-rfu-profile/vendeur-rfu-profile.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [VendeursRfuComponent,VendeurRfuProfileComponent],
  imports: [
    CommonModule,
    VendeursCrudRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule
  ]
})
export class VendeursCrudModule { }
