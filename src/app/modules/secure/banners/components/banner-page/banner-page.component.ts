import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICountry } from "app/services/country.service";
import { Banner, IImgSize } from "app/models/banner";
import * as  bannerActions from "app/actions/banners";
import * as moment from 'moment'



@Component({
  selector: 'bo-banner-page',
  templateUrl: './banner-page.component.html',
  styleUrls: ['./banner-page.component.css']
})
export class BannerPageComponent implements OnInit {
  @Input() banner: Banner
  @Input() countries: Array<ICountry>
  @Output() changeMode: EventEmitter<any> = new EventEmitter<any>()
  @Output() isCloseParentModal: EventEmitter<boolean> = new EventEmitter<boolean>()

  public readonly formLabelsFr = {
    'banner': 'Bannière',
    'name': 'Nom',
    'image': 'Image',
    'link': 'Lien',
    'period': 'Période',
    'enabled': 'Activée',
    'country': 'Pays',
    'delete': 'Effacer',
    'edit': 'Modifier',
    'cancel': 'Annuler',
    'creation': 'Création',
    'last_update': 'Dernière mise à jour'
  }

  public readonly allowedImgSizes: IImgSize = {
    small: [500, 250],
    medium: [1000, 500],
    full: [2500, 1250]
  }

  public readonly messagesFr = {
    'deleteConfirm': 'Êtes-vous sûr de vouloir supprimer cette bannière?'
  }

  public readonly dateFormat: string = 'YYYY-MM-DD'

  public readonly moment = moment

  constructor(private _store: Store<any>) {
  }

  ngOnInit() {
  }

  public performEdit(): void {
    this.changeMode.emit(this.banner)
  }

  public performDelete(): void {
    if (window.confirm(this.messagesFr.deleteConfirm)) {
      this._store.dispatch(new bannerActions.RequestBannerDelete({id: this.banner.id}))
      this.closeModal()
    }
  }

  public closeModal(): void {
    this.isCloseParentModal.emit(true)
  }
}
