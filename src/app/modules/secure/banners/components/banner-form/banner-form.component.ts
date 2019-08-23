import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core'
import { Observable, forkJoin, of } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromRoot from "app/reducers"
import * as  bannerActions from "app/actions/banners"
import 'rxjs/add/operator/map'
import * as moment from 'moment';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { DatarangepickerOptions } from "../../../../shared/common/datarangepicker_options"
import { ICountry } from 'app/services/country.service'
import { DaterangePickerComponent } from 'ng2-daterangepicker';

import { BannersService } from "app/services/banners.service";
import { IImageData, IImgSize } from "app/models/banner";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bo-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.css']
})
export class BannerFormComponent extends DatarangepickerOptions implements OnInit {
  @Input() banner: any
  @Input() countries: Array<ICountry>
  @Output() isEditCanceled: EventEmitter<boolean> = new EventEmitter<boolean>()
  @ViewChild(DaterangePickerComponent, { static: true })
    private picker: DaterangePickerComponent;

  public remoteError$: Observable<any>
  public remoteError: string
  public isLoading: boolean = false

  public form: FormGroup
  public formErrors = {
    name: '',
    is_enabled: '',
    country_code: '',
    period: '', // validates manually on submit
    dynamic_link: '',

    smallImage: '',
    mediumImage: '',
    fullImage: '',
  }

  public smallImageData: IImageData
  public mediumImageData: IImageData
  public fullImageData: IImageData

  private readonly validationMessages = {
    name: {
      maxlength: "Le nom est trop long",
      required: "Ce champ est requis"
    },
    smallImage: {
      width: 'Pas correcte',
      height: 'Pas correcte',
      required: "Ce champ est requis"
    },
    mediumImage: {
      width: 'Pas correcte',
      height: 'Pas correcte',
      required: "Ce champ est requis"
    },
    fullImage: {
      width: 'Pas correcte',
      height: 'Pas correcte',
      required: "Ce champ est requis"
    },
    dynamic_link: {},
    period: {
      required: "Ce champ est requis"
    },
    country_code: {
      required: "Ce champ est requis"
    }
  };

  public readonly formLabelsFr = {
    'banner': 'Bannière',
    'name': 'Nom',
    'image': 'Image',
    'link': 'Lien',
    'period': 'Période',
    'enabled': 'Activée',
    'country': 'Pays',
    'submit': 'Soumettre',
    'cancel': 'Annuler',
    'newBanner': 'Nouvelle bannière'
  }

  public readonly allowedImgSizes: IImgSize = {
    small: [500, 250],
    medium: [1000, 500],
    full: [2500, 1250]
  }

  constructor(
    public _store: Store<any>,
    private _bannersService: BannersService
    ) {
    super()
    this.buildForm()
    this.subscribeOnServerErrors()
  }

  ngOnInit() {
    if (!!this.banner) { this.assignFormValues() }
  }

  ngAfterViewInit() {
    if (this.banner) {
      this.picker.datePicker.setStartDate(moment(this.banner.start));
      this.picker.datePicker.setEndDate(moment(this.banner.end));

      ['smallImage', 'mediumImage', 'fullImage'].forEach((element: string) => {
        this.form.controls[element].setValidators(null);
        setTimeout(() => this.form.controls[element].updateValueAndValidity())
      })
    }
  }

  private subscribeOnServerErrors(): void {
    this.remoteError$ = this._store.select(fromRoot.getBannersError)
    this.remoteError$.subscribe((val: HttpErrorResponse) => {
      if (!this.isEmptyObject(val)) {
        this.remoteError = val.error.detail
      }
    })
  }

  public isEmptyObject(obj: any): boolean {
    if (!obj) {
      return false
    } else {
      return Object.entries(obj).length === 0 && obj.constructor === Object
    }
  }

  public emitModeChange(): void {
    this.isEditCanceled.emit(true)
  }


  public submitForm(value: any): void {
    this.remoteError = ''
    const form = this.form
    if (form.valid) {
      this.isLoading = true

      this.formatFormValues(value).subscribe(
        (formattedValues) => {
          const imgUrls = {image_url_500: 'small', image_url_1000: 'medium', image_url_2500: 'full'};

          const uploadLinks: Observable<string[]> = forkJoin(
            Object.keys(imgUrls).map((img) => {
              if (!this.banner || formattedValues[img] !== this.banner[img]) {
                let data = this[`${imgUrls[img]}ImageData`];
                return this.getObservableForUpload(formattedValues[img], data);
              } else {
                return of(this.banner[img]);
              }
            })
          )

          // TODO: upload move to ngrx action, call on REQUEST_BANNER_CREATE_COMPLETE;
          // probably: close this modal, then upload, then given banner in the list
          uploadLinks.subscribe(
            (results: Array<any>) => {
              formattedValues['image_url_500'] = formattedValues['image_url_500'].split("?")[0]
              formattedValues['image_url_1000'] = formattedValues['image_url_1000'].split("?")[0]
              formattedValues['image_url_2500'] = formattedValues['image_url_2500'].split("?")[0]

              if (this.banner) {
                const upt = {bannerId: this.banner.id, banner: formattedValues}
                this._store.dispatch(new bannerActions.RequestBannerUpdate(upt))
              } else {
                this._store.dispatch(new bannerActions.RequestBannerCreate(formattedValues))
              }

            }, (error) => {
              this.isLoading = false
              this.remoteError = "Error upload images"
            })

         }, (error) => {
          this.remoteError = error.toString()
        }).add(() => {
          this.isLoading = false
        })
    } else {
      this.errorsToMessages(form, true)
    }
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.maxLength(30), Validators.required]),
      is_enabled: new FormControl(null),
      country_code: new FormControl('', Validators.required),
      dynamic_link: new FormControl(''),
      period: new FormControl('', Validators.required),
      smallImage: new FormControl('', Validators.required),
      mediumImage: new FormControl('', Validators.required),
      fullImage: new FormControl('', Validators.required),
    })
    //
    // if (!this.banner) {
    //   ['smallImage', 'mediumImage', 'fullImage'].forEach((element: string) => {
    //     this.form.get(element).setValidators([Validators.required])
    //   })
    // }

    this.form.valueChanges.subscribe((form: any) => this.onFormValueChanges(form))
  }

  private assignFormValues(): void {
    this.form.patchValue({
      name: this.banner.name,
      is_enabled: this.banner.enabled,
      // smallImage: this.banner.image_url_500,
      // mediumImage: this.banner.image_url_1000,
      // fullImage: this.banner.image_url_2500,
      dynamic_link: this.banner.dynamic_link,
      country_code: this.banner.country_code.toUpperCase()
    })

    this.startDateFilter = this.banner.start
    this.endDateFilter = this.banner.end
  }

  public onImageChange(value: any, type: string): void {
    if (value.target.files[0]) {
      const file = value.target.files[0]
      const img = new Image()
      let that = this

      img.onload = function() {
        that[type+'ImageData'].width = img.width
        that[type+'ImageData'].height = img.height
        that.validateImage(that.form, type)
      };

      img.src = window.URL.createObjectURL(file)

      this[type+'ImageData'] = {}
      this[type+'ImageData'].name = file.name
      this[type+'ImageData'].contentType = file.type
      this[type+'ImageData'].file = file

    }
  }

  private onFormValueChanges(data?: any): void {
    if (!this.form) {
      return;
    }
    const form = this.form;
    this.errorsToMessages(form)
  }

  private errorsToMessages(form: FormGroup, isMakeDirty: boolean = false): void {
    this.manualValidatePeriod(form)
    // this.manualValidateImgsDimentions(form)

    // Map errora to string field to show in the template
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control: AbstractControl = form.get(field);

      if (isMakeDirty && control) {
        control.markAsDirty()
      }

      if (control && control.dirty && !control.valid) {
        this.assignValidationMessages(field, control)
      }
    }
  }

  // TODO: to validators
  private manualValidatePeriod(form: FormGroup): void {
    if (!this.startDateFilter && !this.endDateFilter) {
      form.get('period').markAsTouched()
    } else {
      form.get('period').setErrors(null)
    }
  }

  // TODO to validators
  public validateImage(form: FormGroup, type: string): void {
    // reset errors
    form.get(`${type}Image`).setErrors(null)
    if (!this.isEmptyObject(this[type+'ImageData']) &&
        (this[type+'ImageData']['width'] || this[type+'ImageData'].height)) {
      // width within the correct values
      if (this[type+'ImageData']['width'] > this.allowedImgSizes[type][0] + 40 ||
          this[type+'ImageData']['width'] < this.allowedImgSizes[type][0] - 40) {
            form.get(type+'Image').setErrors({'width': 'Pas correcte'})

      // height within the correct values
      } else if (this[type+'ImageData']['height'] > this.allowedImgSizes[type][1] + 40 ||
                  this[type+'ImageData']['height'] < this.allowedImgSizes[type][1] - 40) {
        form.get(type+'Image').setErrors({'height': 'Pas correcte'})
      }
    }
  }

  private assignValidationMessages(field: string, control: AbstractControl): void {
    const messages = this.validationMessages[field]
    for (const key of Object.keys(control.errors)) {
      this.formErrors[field] += messages[key] + ' '
    }
  }

  private formatFormValues(values: any): Observable<any> {
    let formattedValues = {
      name: values.name,
      enabled: values.is_enabled,
      country_code: values.country_code,
      start: this.startDateFilter,
      end: this.endDateFilter,
      dynamic_link: values.dynamic_link
    }

    let obs: Observable<{url: string}[]> = forkJoin([
      this.getObservableFor(this.smallImageData, this.banner && this.banner.image_url_500),
      this.getObservableFor(this.mediumImageData, this.banner && this.banner.image_url_1000),
      this.getObservableFor(this.fullImageData, this.banner && this.banner.image_url_2500)
    ])

    return obs.map(
      (results: Array<{url: string}>) => {
        formattedValues['image_url_500'] = results[0].url
        formattedValues['image_url_1000'] = results[1].url
        formattedValues['image_url_2500'] = results[2].url
        return formattedValues
      },
      (error: any) => {
        this.remoteError = error.toString()
      }
    )
  }

  private getObservableFor(imgData: IImageData, url): Observable<{url: string}> {
    if (!imgData && url) {
      return of({url})
    }
    let urlData = new URLSearchParams()
    urlData.set("filename", imgData.name)
    urlData.set("content-type", imgData.contentType)

    return this._bannersService.getPreSignedUrl(`?${urlData.toString()}`)
  }

  public getObservableForUpload(link: string, imageData: IImageData): Observable<string> {
    return this._bannersService.upload(link, imageData)
  }
}
