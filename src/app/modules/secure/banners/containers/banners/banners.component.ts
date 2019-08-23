import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";

import * as fromRoot from "app/reducers";
import * as modalActions from "app/actions/modal"
import * as  bannerActions from "app/actions/banners"

import { CountryService, ICountry } from 'app/services/country.service';
import { Banner } from "app/models/banner"
import { removeIfEndsWith } from "app/modules/shared/common/utils";


interface IEditModes {
  disabled: number // edit form is disabled, just show
  edit: number     // edit currentBanner
  new: number      // form for new banner create
}


@Component({
  selector: 'bo-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  public readonly COMPONENT_NAME_FR: string = "Bannières"
  public readonly MODAL_ID: string = "banners-modal"
  public readonly EDIT_MODES: IEditModes = {
    disabled: 0,
    edit: 1,
    new: 2
  }
  public readonly PER_PAGE: number = 25

  public editMode: number
  public paginationParams: string
  public filterParams: string
  public isLoading: boolean

  public banners$: Observable<Banner[]>
  public isLoading$: Observable<Boolean>
  public currentBanner$: Observable<Banner | void>
  public bannersCount$: Observable<number>
  
  public countries: Array<ICountry>

  constructor(
    private _store: Store<any>,
    private _countryService: CountryService
  ) {
    this.initStore()
    this.initStoreSubscriptions()
  }

  ngOnInit() {
    this.paginationParams = `page_size=${this.PER_PAGE}`
    this.editMode = this.EDIT_MODES.disabled

    this._countryService
      .getCountryData()
      .subscribe((res: Array<ICountry>) => this.countries = res)

    this._store.dispatch(new bannerActions.RequestBannersList(this.getCurrentParams()))
  }

  private initStore(): void {
    this.banners$ = this._store.select(fromRoot.getBanners)
    this.currentBanner$ = this._store.select(fromRoot.getBanner)
    this.isLoading$ = this._store.select(fromRoot.getBannerStatus)

    this.bannersCount$ = this._store.select(fromRoot.getBannersCount)
  }

  private initStoreSubscriptions(): void {
    this.isLoading$.subscribe((val: boolean) => {
      if (val) { this.isLoading = val }
    })
  }

  public onSelectedBannerChange(banner: any): void {
    this._store.dispatch(new bannerActions.RequestBanner({ id: banner.id }))
    this.switchToShow()

    setTimeout(() => {
      this.showNewBannerModal()    
    }, 750);
  }

  public showNewBannerModal(): void {
    this._store.dispatch(new modalActions.showModal({ id: this.MODAL_ID }))
  }

  public closeBannerModal(): void {
    this._store.dispatch(new modalActions.hideModal({ id: this.MODAL_ID }))
  }

  public onShowNewForm($event: Event): void {
    this.switchToNew()
    this.showNewBannerModal()
  }

  public switchToEdit(): void {
    this.editMode = this.EDIT_MODES.edit
  }

  public switchToShow(): void {
    this.editMode = this.EDIT_MODES.disabled
  }

  public switchToNew(): void {
    this.editMode = this.EDIT_MODES.new
  }

  public onFilterParams(filterParams: string): void {
    this.filterParams = filterParams
    this.paginationParams = ''
    this.performCollectionRequest()
  }

  public onPaginationUrl(paginationQueryParams: string): void {
    this.paginationParams = paginationQueryParams
    this.performCollectionRequest()
  }

  private getCurrentParams(): string {
    const params: Array<string> = [this.paginationParams, this.filterParams]
    let query: string = "?" + params.join("&")

    query = removeIfEndsWith(query, '&')
    return query
  }

  private performCollectionRequest(): void {
    const queryParams = this.getCurrentParams()
    this._store.dispatch(new bannerActions.RequestBannersList(queryParams))
  }
}
