import {
  Component,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ElementRef
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';
import { NewVendor } from '../../../../../models/new_vendor';
import { UptVendor } from '../../../../../models/upt_vendor';
import { Vendeursrfu } from '../../../../../models/vendeursrfu';

import { Pays } from '../../../../../models/pays';
import { Localites } from '../../../../../models/localites';
import { User } from '../../../../../models/user';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../../reducers';

import * as sessionActions from '../../../../../actions/session';
import * as vendeurActions from '../../../../../actions/vendeursrfu';
import * as activiteActions from '../../../../../actions/activites';
import * as annoncesActions from '../../../../../actions/annonces';
import * as paysActions from '../../../../../actions/pays';
import * as localitesActions from '../../../../../actions/localites';
import { updateURL } from 'app/utils';
import { Annonce } from 'app/models/annonce';
import { Activite } from 'app/models/activite';
import { VendeursrfuService, ApisService } from 'app/services';
import { Observable, Subject } from "rxjs";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../../../../environments/environment';
import { ComponentsModule } from 'app/components';
import { runInThisContext } from 'vm';
import { Country } from 'app/containers/dashboard/dashboard.component';
import { threadId } from 'worker_threads';
import { Router } from '@angular/router';
declare const jQuery: any;


@Component({
  selector: 'app-vendeurs-rfu',
  templateUrl: './vendeurs-rfu.component.html',
  styleUrls: ['./vendeurs-rfu.component.css', '../../../../../../assets/styles/apps/tickets.css']
})
export class VendeursRfuComponent implements OnInit, OnDestroy {
  subscription: any;
  subscription2: any;
  current_page = 1;
  recherche: any;
  titre$: string;
  searchForm: FormGroup;
  user$: Observable<User>;
  config$: Observable<any>;
  pays$: Observable<Pays[]>;
  localities$: Observable<Localites[]>;
  vendeurs$: Observable<Vendeursrfu[]>;
  export_vendeurs$: Observable<string>;
  vendeur$: Observable<Vendeursrfu>;
  vendeurStatus$: Observable<Boolean>;
  annonces$: Observable<Annonce[]>;
  activites$: Observable<Activite[]>;
  vendeur: Vendeursrfu;
  new_vendeur: NewVendor;
  // upt_vendeur: UptVendor;
  vendeurs = [];
  loading = false;
  total: number;
  total_page: number;
  next = '';
  prev = '';
  page: number = null;
  status$: Observable<any>;
  nextPage$: Observable<string>;
  prevPage$: Observable<string>;
  count$: Observable<number>;
  filter: object = {};
  finished = false;
  selector = '.main-panel';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  editForm: FormGroup;
  localityByCountry$ = [];
  localites$:any;
  phone_code: string;
  pays_code: string;
  diagnostic : string;
  pays_field: string;
  public isCollapsed = false;
  acquisition : any [] = [
    {id:0, nom:'Ambassadeurs'},
    {id:1, nom:'Prospection téléphonique'},
    {id:2, nom:'Online'},
    {id:3, nom:'Autre'}
  ]
  public sectionCollapseStates: { [key: number]: boolean } = {
    0: true,
    1: true,
  }

  new_vendor = {
    "name": "",
    "email": "",
    "password1": "",
    "password2": "",
    "country": "",
    "address": "",
    "phone": "",
    "whatsapp_phone":"",
    "longitude": null,
    "latitude": null,
    "source": "backoffice",
    "source_version": "v1.13.0",
    "acquisition_channel": "",
    "account_type": "standard",
    "device_id": null,
    "gender": null,
    "birthday": null  
  };
  vendorForm: FormGroup;
  vendorFormErrors = {
    name: '',
    email: '',
    password1: '',
    password2: '',
    country: ''
  };

  formErrors = {
    name: '',
    email: '',
    password1: '',
    password2: '',
    country: '',
    toshort: ''
  };

  validationMessages = {
    name: {
      required: 'Le nom complet est obligatoire.'
    },
    email: {
      required: `L'email est obligatoire.`
    },
    password1: {
      required: `Le mot de passe est obligatoire.`,
      toshort: `Le mot de passe doit contenir au minimum 8 caractere.`

    },
    password2: {
      required: `La confirmation mot de passe est obligatoire.`
    },
    country: {
      required: `Le pays est obligatoire.`
    }
  };

  



  constructor(private apiService: ApisService, private _store: Store<fromRoot.State>, private elm: ElementRef, private vendeurService: VendeursrfuService, private router: Router) {
    this.titre$ = 'Vendeurs RFU';
    this.user$ = _store.select(fromRoot.getSessionUser);
    this.config$ = _store.select(fromRoot.getSessionConfig);
    this.nextPage$ = _store.select(fromRoot.getVendeursRfuNext);
    this.annonces$ = _store.select(fromRoot.getAnnonces);
    this.activites$ = _store.select(fromRoot.getActivites);
    this.prevPage$ = _store.select(fromRoot.getVendeursRfuPrev);
    this.count$ = _store.select(fromRoot.getVendeursRfuCount);
    this.status$ = _store.select(fromRoot.getVendeurRfuStatus);
    this.vendeur$ = _store.select(fromRoot.getVendeurRfu);
    this.vendeurs$ = _store.select(fromRoot.getVendeursRfu);
    this.pays$ = _store.select(fromRoot.getPays);
    this.localities$ = _store.select(fromRoot.getLocalites);
    this.loading = true;
    this.count$.subscribe(val => {
      if (val !== 0) {
        this.total = Math.ceil(val / 30);
        // tslint:disable-next-line:curly
      } else this.total = 0;
    });
    this.status$.subscribe(val => {
      if (val === true) {
        this.loading = true;
        // tslint:disable-next-line:curly
      } else
        this.loading = false;
    });
    this.prevPage$.subscribe(val => (this.prev = val));
    this.nextPage$.subscribe(val => (this.next = val));
    this.buildeditForm();
    this.buildSearchForm();


  }

  ngOnInit() {
    this._store.dispatch(new sessionActions.RequestGetCurrentUserAction());
    this._store.dispatch(new vendeurActions.RequestVendeursRfu());
    this._store.dispatch(new vendeurActions.RequestVendeursRfuNext());
    this._store.dispatch(new vendeurActions.RequestVendeursRfuPrev());
    this._store.dispatch(new paysActions.RequestPays());
    this._store.dispatch(new localitesActions.RequestLocalites());
    this.dtOptions = {
      pagingType: "full_numbers",
      retrieve: true,
      paging: false,
      info: false
    };

    this.subscription2 = this.vendeurs$.subscribe(vendeurs => {
      this.vendeurs = vendeurs;
      this.dtTrigger.next();
    });
    this.subscription = this.vendeur$.subscribe(val => {
      this.vendeur = val;
      if (this.vendeur){
        let acquisition =  this.acquisition.filter(nom=>nom.nom === this.vendeur.acquisition_channel)[0];
        this.editForm.reset();
        this.editForm.patchValue({
          uuid: this.vendeur.uuid,
          name: this.vendeur.name,
          email: this.vendeur.email,
          phone: this.vendeur.phone,
          country: this.vendeur.country,
          whatsapp_phone: this.vendeur.whatsapp_phone,
          acquisition_channel: acquisition.id,
          is_active: this.vendeur.is_active,
          address_show: this.vendeur.address,
          address:"",
        });
      this.editForm.controls['address_show'].disable();
      this.localities$.subscribe(val => (this.localites$ = val));
      this.onChangePays(this.vendeur);
      }
    });
    this.buildvendorForm();
    this.phone_code = "";
  }


  onScroll() {
    console.log('scrolled!!');
  }

  onSelectVendeur(vendeur: Vendeursrfu) {
    this._store.dispatch(new vendeurActions.RequestVendeurRfu(vendeur));
    this._store.dispatch(
      new activiteActions.RequestActivites({ user_id: vendeur.uuid, page_size: 5 })
    );
    this._store.dispatch(
      new annoncesActions.RequestAnnonces({ user_id: vendeur.uuid, page_size: 5 })
    );
  }

  exportCSV() {
    this.vendeurService.getVendeursExport(this.filter).subscribe(
      val => {
        let blob = new Blob([val], { type: 'text/csv' });
        saveAs(blob, 'vendeurs.csv');
      });

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  getPage() {
    this.current_page += 1;
    this._store.dispatch(new vendeurActions.RequestVendeursRfu(this.next));
  }

  getPreviousPage() {
    this.current_page -= 1;
    this.vendeurs = [];
    this._store.dispatch(new vendeurActions.RequestVendeursRfu(this.prev));
  }

  getNextPage() {
    this.current_page += 1;
    this.vendeurs = [];
    this._store.dispatch(new vendeurActions.RequestVendeursRfu(this.next));
  }

  goToPage() {
    const url: any = null;
    this.current_page = this.page;
    this.vendeurs = [];
    const newURL = updateURL( this.page);
    this._store.dispatch(new vendeurActions.RequestVendeursRfu(newURL));
  }

  search(formValue) {
    this.vendeurs = [];
    this.current_page = 1;
    this._store.dispatch(new vendeurActions.RequestVendeursRfu(this.filter));
  }

  reset() {
    this.vendeurs = [];
    this.current_page = 1;
    this._store.dispatch(new vendeurActions.RequestVendeursRfu());
  }
  buildSearchForm(): void {
    this.searchForm = new FormGroup({
      pays: new FormControl(''),
      keyword: new FormControl(''),
      last_signin: new FormControl(''),
      last_posting: new FormControl(''),
      inscrit_moins_de: new FormControl(''),
      nbre_annonces: new FormControl(''),
      nbre_produits_vendus: new FormControl('')
    });
    this.searchForm.valueChanges.subscribe(data => (this.filter = data));
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
  edit(vendeur) {
    this._store.dispatch(new vendeurActions.RequestVendeurRfu({id: vendeur.uuid}));
    jQuery('#edit-vendeur-form-modal').modal('show');
  }
  onEditFormSubmit(formValue) {
    formValue.acquisition_channel = (this.acquisition[parseInt(formValue.acquisition_channel)]).nom;
    if (formValue.address){
      formValue.latitude = this.new_vendor.latitude;
      formValue.longitude = this.new_vendor.longitude;
    }
    delete formValue['address'];
    this._store.dispatch(new vendeurActions.RequestVendeurRfuUpdate({vendor:formValue,uuid: formValue.uuid}));
    jQuery('#edit-vendeur-form-modal').modal('hide');
    this.router.navigate(['/vendeursrfu', formValue.uuid]);
  }
  buildeditForm() {
    this.editForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      whatsapp_phone: new FormControl('', Validators.required),
      uuid: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      acquisition_channel: new FormControl(),
      is_active: new FormControl(),
      address: new FormControl(),
      address_show: new FormControl(),
      latitude: new FormControl(),
      longitude: new FormControl(),
    });
  }

  getPays(code_pays){
    this.pays$.subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        if (value[i].code == code_pays) {
          return value[i].nom;
        }
      }
    });
    return "";
  }
  fetchVendeur(){
    this.vendeur$.subscribe(val => {
      this.vendeur = val;
    });
  }
  public switchSectionState(section: number): void {
    this.sectionCollapseStates[section] = !this.sectionCollapseStates[section]
  }

  //Creation Vendeur

  onChangePays(c) {
    let id ;
    this.localityByCountry$ = [];
    this.pays$.subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        if (value[i].id == c.country) {
          this.phone_code = value[i].phone_code;
          this.pays_code = value[i].code;
          id = c.country;
        }
        if (value[i].code == c.country) {
          id = value[i].id;
        }
      }
    });
    for (let i = 0; i < this.localites$.length; i++) {
      if (this.localites$[i].pays == id) {
        this.localityByCountry$.push(this.localites$[i]);
      }
    }
  }

  onCreateNewVendor(vendor){
    let acquisition_channel;
    let flag = false;
    if (vendor.name == '') {
      this.formErrors['name'] = this.validationMessages['name'].required;
      flag = true;
    }
    if (vendor.email == '') {
      this.formErrors['email'] = this.validationMessages['email'].required;
      flag = true;
    }
    if (vendor.password1 == '') {
      this.formErrors['password1'] = this.validationMessages['password1'].required;
      flag = true;
    }
    if (vendor.password2 == '') {
      this.formErrors['password2'] = this.validationMessages['password2'].required;
      flag = true;
    }
    if (vendor.country == '') {
      this.formErrors['country'] = this.validationMessages['country'].required;
      flag = true;
    }
    if (vendor.password1 !== vendor.password2){
      this.diagnostic = "les mots de passe ne correspondent pas";
      flag = true;
      
    }
    if (vendor.password1.length< 8 ){
      this.formErrors['toshort'] = this.validationMessages['password1'].toshort;
      flag = true;
      
    }
    if (flag) {
      return;
    }
    // this.new_vendor = vendor;
    acquisition_channel = (this.acquisition[parseInt(vendor.acquisition_channel)]).nom;
    this.new_vendor.name = vendor.name;
    this.new_vendor.email = vendor.email;
    this.new_vendor.password1 = vendor.password1;
    this.new_vendor.password2 = vendor.password2;
    this.new_vendor.country = vendor.country;
    this.new_vendor.phone = vendor.phone;
    this.new_vendor.whatsapp_phone = vendor.whatsapp_phone;
    this.new_vendor.acquisition_channel = acquisition_channel;
    if (vendor.account_type){
      this.new_vendor.account_type = vendor.account_type;
    }
    // this.new_vendor.address = vendor.address;

    if (!this.new_vendor.phone.includes(this.phone_code)){
      if (this.new_vendor.phone.indexOf(this.phone_code)){
          this.new_vendor.phone = "";
      }else{
        this.new_vendor.phone = this.phone_code+""+this.new_vendor.phone; 
      }
    }
    if (!this.new_vendor.whatsapp_phone.includes(this.phone_code)){
        if (this.new_vendor.whatsapp_phone.indexOf( this.phone_code)){
          this.new_vendor.whatsapp_phone = "";
      }
      else{
        this.new_vendor.whatsapp_phone = this.phone_code+""+this.new_vendor.whatsapp_phone; 
      }
    }
    this.new_vendor.country = this.pays_code; 
    this._store.dispatch(
      new vendeurActions.RequestVendeurRfuCreate(this.new_vendor)
    );
    this._store.dispatch(new vendeurActions.RequestVendeursRfu());
    this.vendorForm.reset();
    jQuery('#CreateVendorModal').modal('hide');
  }


  buildvendorForm() {
    this.vendorForm = new FormGroup({
      name: new FormControl(this.new_vendor.name, Validators.required),
      email: new FormControl(this.new_vendor.email, [Validators.required, Validators.email]),
      password1: new FormControl(this.new_vendor.password1, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      password2: new FormControl(this.new_vendor.password2, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      country: new FormControl(this.new_vendor.country, Validators.required),
      phone: new FormControl(''),
      whatsapp_phone: new FormControl(''),
      address: new FormControl(''),
      acquisition_channel: new FormControl(''),
      account_type: new FormControl('')


    });
    this.vendorForm.valueChanges.subscribe(data =>
      this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password1').value === fg.get('password2').value ? null : { 'mismatch': true };
  };


  onValueChanged(data?: any) {
    if (!this.vendorForm) {
      return;
    }
    const form = this.vendorForm;

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

  onSelectLocality(vendeur){
    for (let i = 0; i < this.localites$.length; i++) {
      if (this.localites$[i].nom !== vendeur.address){
        for (let j = 0; j < this.localites$[i].childs.length; j++) {
          if (this.localites$[i].childs[j].nom == vendeur.address) {
            this.new_vendor.latitude = this.localites$[i].childs[j].latitude;
            this.new_vendor.longitude = this.localites$[i].childs[j].longitude;
          }
        }
      }else{
        return;
      }
    }
  }
}
