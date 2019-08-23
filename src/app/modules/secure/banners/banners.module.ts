import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { BannersRoutingModule } from './banners-routing.module'

import { BannersComponent } from './containers/banners/banners.component';

import { BannerPageComponent } from './components/banner-page/banner-page.component';
import { BannerFormComponent } from './components/banner-form/banner-form.component';
import { BannerFiltersComponent } from './components/banner-filters/banner-filters.component'
import { BannerTableComponent } from './components/banner-table/banner-table.component';

@NgModule({
  declarations: [
    BannerPageComponent,
    BannersComponent,
    BannerFormComponent,
    BannerFiltersComponent,
    BannerTableComponent
  ],
  imports: [
    CommonModule,
    BannersRoutingModule,
    SharedModule
  ]
})

export class BannersModule { }
