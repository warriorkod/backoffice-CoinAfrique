import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MomentModule} from 'ngx-moment';
import {ImgFallbackModule} from 'ngx-img-fallback';
import {LoadingModule} from 'ngx-loading';

import {Daterangepicker} from 'ng2-daterangepicker';

import {PipesModule} from '../../pipes';

import {HeaderComponent} from '../../components/header/header.component';
import {ImageEditComponent} from '../../components/image-edit/image-edit.component';

import {AnnonceEditModalComponent} from './components/annonce-edit-modal/annonce-edit-modal.component';
import {ModalComponent} from './components/modal/modal.component';  
import { PaginationComponent } from './components/pagination/pagination.component';
import { AnnoncerfuEditModalComponent } from './components/annoncerfu-edit-modal/annoncerfu-edit-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ImageEditComponent,
    AnnonceEditModalComponent,
    ModalComponent,
    PaginationComponent,
    AnnoncerfuEditModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    ImgFallbackModule,
    LoadingModule,
    Daterangepicker,
    PipesModule
  ],
  exports: [
    ModalComponent,
    HeaderComponent,
    ImageEditComponent,
    AnnonceEditModalComponent,
    AnnoncerfuEditModalComponent,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    MomentModule,
    Daterangepicker,
    ImgFallbackModule,
    PipesModule,
  ],
})
export class SharedModule {
}
