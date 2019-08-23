import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../pipes';
import { ImgFallbackModule } from 'ngx-img-fallback';

import { HttpClientModule } from '@angular/common/http';

import { AsideComponent } from './aside/aside.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { PremiumModalComponent } from './premium-modal/premium-modal.component';
import { ModerateurModalComponent } from './moderateur-modal/moderateur-modal.component';
import { StatModalComponent } from './stat-modal/stat-modal.component';
import { LoadingModule } from 'ngx-loading';
import { AdModalComponent } from './ad-modal/ad-modal.compontent';
import { IsahitBatchComponent } from './isahit-batch/isahit-batch.component';
import { IsahitTokenComponent } from './isahit-token/isahit-token.component';
import { IsahitAddBatchComponent } from './isahit-addbatch/isahit-addbatch.component';
import { IsahitReportComponent } from './isahit-report/isahit-report.component';
import { IsahitModerationComponent } from './isahit-moderation/isahit-moderation.component';
import { IsahitParametersComponent } from './isahit-parameters/isahit-parameters.component';
import { IsahitParameterModalComponent } from './isahit-parameter-modal/isahit-parameter-modal.component';
import {SharedModule} from '../modules/shared/shared.module';

export const COMPONENTS = [
  AsideComponent,
  NavbarComponent,
  CategoriesTableComponent,
  PremiumModalComponent,
  ModerateurModalComponent,
  StatModalComponent,
  AdModalComponent,
  IsahitBatchComponent,
  IsahitTokenComponent,
  IsahitAddBatchComponent,
  IsahitReportComponent,
  IsahitModerationComponent,
  IsahitParametersComponent,
  IsahitParameterModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoadingModule,
    PipesModule,
    ImgFallbackModule,
    HttpClientModule,
    SharedModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})

export class ComponentsModule { }
