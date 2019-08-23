import { NgModule } from '@angular/core';
import { TypeAnnoncePipe, EtatProduitPipe, SortPipe } from './annonces.pipes';
import { EtatAnnoncePipe } from './annonces.pipes';
import { RoleModerateurPipe } from './annonces.pipes';
import { KeysPipe } from './annonces.pipes';
import { AnnonceByIdPipe } from './annonces.pipes';
import { ReadableBooleanFrPipe, ReadableCountryName } from './common.pipes';

export const PIPES = [
  TypeAnnoncePipe,
  EtatAnnoncePipe,
  EtatProduitPipe,
  RoleModerateurPipe,
  KeysPipe,
  SortPipe,
  AnnonceByIdPipe,
  ReadableBooleanFrPipe,
  ReadableCountryName
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
