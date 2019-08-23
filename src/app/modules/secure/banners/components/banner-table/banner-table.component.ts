import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Banner } from "app/models/banner";
import { ICountry } from "app/services/country.service";

@Component({
  selector: 'bo-banner-table',
  templateUrl: './banner-table.component.html',
  styleUrls: ['./banner-table.component.css']
})
export class BannerTableComponent implements OnInit {
  public readonly bannerDateFormat: string = 'DD/MM/YYYY HH:mm'

  @Input() banners: Array<Banner>
  @Input() countries: Array<ICountry>
  @Output() emitBanner: EventEmitter<any> = new EventEmitter<Banner>()

  public bannersResponse: any

  constructor() { }

  ngOnInit() { }

  public emitBannerInfo(banner: Banner): void {
    this.emitBanner.emit(banner)
  }
}
