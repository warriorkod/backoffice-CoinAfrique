import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';

import { Annonce } from 'app/models/annonce';
import { Categorie } from 'app/models/categorie';
import { Pays } from 'app/models/pays';
import { Collection } from 'app/models/collection';

import { ResizeOptions } from 'ng2-image-compress';
import { IImage } from 'ng2-image-compress';
import { ImageCompressService } from 'ng2-image-compress';
import { Ng2ImgMaxService } from 'ng2-img-max';

import * as customType from '../../../../models/constants';

import { LockService } from '../../../../services';
import { AnnonceService } from '../../../../services';

import { adStateFr } from 'app/utils';
// declare var moment;
@Component({
  selector: 'bo-annoncerfu-edit-modal',
  templateUrl: './annoncerfu-edit-modal.component.html',
  styleUrls: ['./annoncerfu-edit-modal.component.css']
})
export class AnnoncerfuEditModalComponent implements OnInit {
  customType = customType;
  editForm: FormGroup;
  imageForm: FormGroup;
  collectionForm: FormGroup;
  daterange: any = {};
  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    autoUpdateInput: false
  };
  showCollection = false;
  display_updload = 0;
  protomotionDate: string;
  display_editImage = 0;
  prev_Image : any;
  annonces$: Observable<Annonce[]>;
  currentPage$: Observable<string>;
  motifRejet$: string;
  isImageEditError: boolean = false;
  readonly imageEditErrorTimeout: number = 4001;
  urlImage = "https://dfv1lq33anx1v.cloudfront.net/";

  @Input() annonce: Annonce;
  @Input() mustFetchLocks: boolean;
  @Input() categories: Categorie[];
  @Input() url$: number;
  @Input() deal_type_display: any;
  @Input() pays: Pays[];
  @Input() status: boolean;
  @Input() current_page: number;
  @Input() collections: Collection[];
  @Input() placeholder: string;
  @Input() vendeur: boolean;
  @Input() allAdsLocked$: {};
  @Output() submitImage = new EventEmitter();
  @Output() deletePhoto = new EventEmitter();
  @Output() generateLink = new EventEmitter();
  @Output() onFormSubmit = new EventEmitter();
  @Output() moderateAd = new EventEmitter();
  @Output() onCollectionFormSubmit = new EventEmitter();
  @Output() onAdsLockedChanged = new EventEmitter<any>();
  @Output() mustEmitLocks = new EventEmitter<any>();


  config = {
    theme: 'dp-material',
    config: { format: 'YYYY-MM-DD', mode: 'daytime' },
    format: 'YYYY-MM-DD',
    mode: 'daytime'
  };
  formErrors = {
    ad_id: '',
    collection: '',
    promotion_date: ''
  };

  validationMessages = {
    collection: {
      required: 'La collection est obligatoire.'
    },
    promotion_date: {
      required: 'Ce champ est obligatoire, Choisissez une période de deal'
    }
  };

  constructor(
    private ng2ImgMaxService: Ng2ImgMaxService,
    private _store: Store<fromRoot.State>,
    private lockService: LockService,
    private cd: ChangeDetectorRef,
    private annonceService: AnnonceService
  ) {
    this.buildForm();
    this.createForm();
    this.buildEditForm();
    this.annonces$ = _store.select(fromRoot.getAnnonces);
    this.currentPage$ = _store.select(fromRoot.getAnnoncesNext);
  }

  ngOnInit() {
    this.display_editImage = 0;
    this.formErrors = {
      ad_id: '',
      collection: '',
      promotion_date: ''
    };
  }

  toogleCollection() {
    if (this.showCollection) {
      this.showCollection = false;
    } else {
      this.showCollection = true;
    }
  }

  buildForm(): void {
    this.collectionForm = new FormGroup({
      ad_id: new FormControl(''),
      collection: new FormControl('', Validators.required)
    });

    this.collectionForm.valueChanges.subscribe(data =>
      this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  buildEditForm(): void {
    this.editForm = new FormGroup({
      id: new FormControl(''),
      titre: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      message_moderation: new FormControl('', Validators.required),
      prix: new FormControl('', Validators.required),
      deal: new FormControl('', Validators.required),
      categorie: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
      deal_type: new FormControl('', Validators.required),
      deal_custom: new FormControl(''),
      amount_discount: new FormControl('', Validators.required),
      start_discount: new FormControl('', Validators.required),
      end_discount: new FormControl('', Validators.required),
      type_annonce: new FormControl('', Validators.required),
      motif_refus: new FormControl('')
    });

    this.editForm.valueChanges.subscribe(data => this.editOnValueChanged(data));
    // this.editOnValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.collectionForm) {
      return;
    }

    const form = this.collectionForm;

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['annonce'] && changes['annonce'].currentValue) {
      const annonce = changes['annonce'].currentValue;
      this.collectionForm.patchValue({
        ad_id: annonce['id'],
        collection: '',
      });
      this.editForm.patchValue({
        id: annonce['id'],
        titre: annonce['titre'],
        deal: annonce['deal'],
        categorie: annonce['category']['id'],
        message_moderation: annonce['message_moderation'],
        prix: annonce['prix'],
        description: annonce['description'],
        // deal_type: annonce['deal_type'].toString(),
        deal_custom: annonce['deal_custom'],
        amount_discount: annonce['amount_discount'],
        start_discount: annonce['start_discount'],
        end_discount: annonce['end_discount'],
        // type_annonce: annonce["type_annonce"],
        pays: annonce['pays'],
        motif_refus: ''
      });
    }
  }

  fetchModerationMessage (value) {
    const message = this.annonceService.getOneCommonModerationMessage(value);
    this.motifRejet$ = message;
  }

  editOnValueChanged(data?: any) {
    if (!this.collectionForm) {
      return;
    }
    const form = this.editForm;
    this.deal_type_display = form.get('deal_type').value;
    if (form.get('motif_refus').value) {
      this.fetchModerationMessage(form.get('motif_refus').value);
    }

    if ( this.deal_type_display !== 0 ) {
      if ( data.deal_type !== 0) {
        if ( data['start_discount'] === undefined || data['end_discount'] === undefined ) {
          this.protomotionDate = null;
        } else {
          let start_discount = this.formatDate(data['start_discount'], '-');
          let end_discount = this.formatDate(data['end_discount'], '-');
          this.protomotionDate = `${start_discount} - ${end_discount}`;
        }
      } else {
        this.protomotionDate = '';
      }
    }
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  displayEditImage(etat) {
    this.display_editImage = etat;
    this.deleteAdLock();
  }

  moderate(etat) {
    const params = this.editForm.value;
    params.etat = etat;
    params.etat_type = etat;

    // validating an ad
    if (params.etat === 1) {
      params.state = 2;
    }

    // rejecting an ad
    if (params.etat === 2) {
      params.state = 3;
    }

    if (etat === 4) {
      params.action = 1;
      params.etat = 1;
    }

    this.moderateAd.emit(params);
    this.deleteAdLock();
  }


  deleteAdLock() {
    const annonce_id = this.annonce.id;
    this.lockService.deleteLock(annonce_id);
    this.removeRowOnlockTableProvider(annonce_id);
  }

  removeRowOnlockTableProvider(annonce_id) {
    if (this.allAdsLocked$) {
      delete this.allAdsLocked$[annonce_id];
    }
    this.onAdsLockedChanged.emit(this.allAdsLocked$);
    this.mustFetchLocks = true;
    setTimeout(() => {
      this.mustEmitLocks.emit(this.mustFetchLocks);
    }, 2001);
  }

  createForm() {
    this.imageForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      avatar: new FormControl('')
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageForm.get('id').setValue(this.annonce.id);
        this.imageForm.get('name').setValue('photo' + this.display_updload);
        this.imageForm.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: (reader.result as string).split(',')[1]
        });
      };
    }
  }

  onEditFormSubmit(formValue: any, event?: Event) {
    if (event) { event.preventDefault(); }

    const isNoDiscounts: boolean = formValue['start_discount'] === undefined ||
                                   formValue['end_discount'] === undefined

    if ( (formValue.deal_type != 0 ) && isNoDiscounts) {
      this.formErrors['promotion_date'] = this.validationMessages['promotion_date']['required'];
      return;
    }

    this.onFormSubmit.emit(formValue);
    setTimeout(() => {
      this.deleteAdLock();
    }, 1001)
  }

  onImageChange(fileInput: any) {
    const option: ResizeOptions = new ResizeOptions();
    const images: Array<IImage> = [];

    images.push(fileInput);

    option.Resize_Max_Height = 700;
    option.Resize_Max_Width = 450;
    option.Resize_Quality = 90;
    option.Resize_Type = 'image/png';

    ImageCompressService.filesToCompressedImageSource(
      fileInput.target.files
    ).then(observableImages => {
      observableImages.subscribe(
        image => {
          images.push(image);
          this.imageForm.get('id').setValue(this.annonce.id);
          this.imageForm.get('name').setValue('photo' + this.display_updload);
          this.imageForm.get('avatar').setValue({
            filename: image.fileName,
            filetype: image.type,
            value: image.compressedImage.imageDataUrl.split(
              'data:image/jpeg;base64,'
            )[1]
          });
        },
        error => {
          console.log('Error while converting');
        }
      );
    });
  }

  updateSource(nbre) {
    this.display_updload = nbre;
  }

  editImage(value) {
    if ( confirm('Are you sure want to edit image?') ) {
      this.display_editImage = value;
    }
  }

  deleteImage(value) {
    if ( confirm('Are you sure want to delete image?') ) {
      this.deletePhoto.emit(value);
    }
  }


  public selectedDate(value: any, datepickerr?: any) {

    this.daterange['start'] = value.start.format('YYYY-MM-DD');
    this.daterange['end'] = value.end.format('YYYY-MM-DD');
    this.daterange['label'] = value.label;
    this.editForm.get('start_discount').setValue(this.daterange['start']);
    this.editForm.get('end_discount').setValue(this.daterange['end']);

  }

  onImageCropped($event) {
    document.getElementById('photo'+this.display_editImage).setAttribute('src', $event);
  }

  onImageEditClose() {
    this.display_editImage = 0;
  }

  onLoadsSrcError(openEditNumber: number): void {
    // close edit form, add alert
    this.display_editImage = 0;
    this.showImageEditError()
  }

  showImageEditError() {
    this.isImageEditError = true

    setTimeout(() => {
      this.isImageEditError = false
      this.cd.detectChanges()
    }, this.imageEditErrorTimeout)
  }

  onImageSave($event) {
    this.imageForm.get('id').setValue(this.annonce.id);
    this.imageForm.get('name').setValue('photo' + this.display_editImage);
    // this.imageForm.get('name').setValue('photo1');
    this.imageForm.get('avatar').setValue({
      filename: "editedimage.png",
      filetype: "image/png",
      value: $event.split('data:image/png;base64,')[1]
    });
    this.submitImage.emit(this.imageForm.value);
  }

  formatDate(date, splitter) {
    return date.split('T')[0];
  }

  public normalizeControl(formControl: any, event?: Event): void {
    if (!!event) {
      event.preventDefault()
    }
    formControl.setValue(this.normalizeText(formControl.value))
  }

  private normalizeText(text: string): string {
    let formattedTitle = text.trim().toLowerCase()
    return formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1)
  }

  public submitCollectionForm(form: any): void {
    this.onCollectionFormSubmit.emit(form.value)
    this.deleteAdLock()
  }

  public getAdStateName(ad: Annonce): string {
    return ad ? adStateFr(ad.state) : ''
  }
}
