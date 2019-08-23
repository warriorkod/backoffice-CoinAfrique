import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, } from '@angular/forms';
import { ICountry } from 'app/services/country.service';
import { removeIfEndsWith } from "app/modules/shared/common/utils";


interface IVisibility {
  name: string
  code: number|void
}


interface IFilter {
  sort_by: string
  is_enabled: boolean|void
  name?: string
  id?: string
  country_code?: string
}


@Component({
  selector: 'bo-banner-filters',
  templateUrl: './banner-filters.component.html',
  styleUrls: ['./banner-filters.component.css']
})
export class BannerFiltersComponent implements OnInit {
  public filterBannerForm: FormGroup

  @Input() countries: Array<ICountry>
  @Output() onShowNewForm: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() onFilterParams: EventEmitter<string> = new EventEmitter<string>()

  public readonly labelsFr = {
    newBanner: 'Nouvelle bannière',
    allBanners: 'Toutes les bannières',
    current: 'Actuellement affiché',
    disabled: 'Désactivée',
    name: 'Entrez le nom',
    filter: 'Filtre',
    countries: 'Pays',
    visibilities: 'Visibilité'
  }

  public readonly validationRules = {
    name: {
      maxLength: 150
    }
  }

  public visibilities: Array<IVisibility> = [
    {
      name: this.labelsFr.allBanners,
      code: null
    },
    {
      name: this.labelsFr.current,
      code: 1
    },
    {
      name: this.labelsFr.disabled,
      code: 0
    }
  ]

  constructor(
  ) { }

  ngOnInit() {
    this.buildFilterBannerForm()
  }

  public emitShowNewBannerForm(): void {
    this.onShowNewForm.emit(true)
  }

  private buildFilterBannerForm(): void {
    this.filterBannerForm = new FormGroup({
      country_code: new FormControl(""),
      is_enabled: new FormControl(null),
      name: new FormControl("")
    })
  }

  public performBannerFiltration(formValue: IFilter): void {
    let query: string = this.getQueryString(formValue)
    this.onFilterParams.emit(query)
  }

  private getQueryString(formValue: IFilter): string {
    let queryParam: string = ''

    if (formValue.country_code) {
      queryParam += `country_code=${formValue.country_code.toLowerCase()}&`
    }

    if (typeof formValue.is_enabled === "number") {
      queryParam += `is_enabled=${formValue.is_enabled}&`
    }

    if (formValue.name) {
      queryParam += `name=${formValue.name}&`
    }

    queryParam = removeIfEndsWith(queryParam, '&')
    return queryParam
  }
}
