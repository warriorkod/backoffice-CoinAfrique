import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Annonce } from '../../../../../models/annonce';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../../reducers';
import { User } from '../../../../../models/user';
import { Vendeursrfu } from '../../../../../models/vendeursrfu';
import { Activite } from '../../../../../models/activite';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
declare const jQuery: any;

import * as sessionActions from '../../../../../actions/session';
import * as authActions from '../../../../../actions/auth';
import * as annoncesRfuActions from '../../../../../actions/annoncesrfu';
import * as vendeurActionsrfu from '../../../../../actions/vendeursrfu';
import * as categoriesActions from '../../../../../actions/categories';
import * as collectionsActions from '../../../../../actions/collections';
import * as activiteActions from '../../../../../actions/activites';
import * as paysActions from '../../../../../actions/pays';
import * as localitesActions from '../../../../../actions/localites';
import { Pays } from '../../../../../models/pays';
import { Localites } from '../../../../../models/localites';
import { Collection } from '../../../../../models/collection';
import { Categorie } from '../../../../../models/categorie';
import { Lock } from '../../../../../models/lock';
import { adStateFr } from '../../../../../utils/index';
import { environment } from '../../../../../../environments/environment';


@Component({
  selector: 'app-vendeur-ffu-profile',
  templateUrl: './vendeur-rfu-profile.component.html',
  styleUrls: ['./vendeur-rfu-profile.component.css'],
})

export class VendeurRfuProfileComponent implements OnInit, OnDestroy {
  titre$ = 'Profil vendeur';
  subscription:any;
  user$: Observable<User>;
  config$: Observable<any>;
  annonces$: Observable<Annonce[]>;
  annoncesSearch$: Observable<Annonce[]>;
  annonce: Annonce;
  annonce$: Observable<Annonce>;
  activites$: Observable<Activite[]>;
  pays$: Observable<Pays[]>;
  localities$: Observable<Localites[]>;
  loading = false;
  vendeur_view = true;
  total = 1;
  total_page: number;
  next = '';
  prev = '';
  status$: Observable<any>;
  nextPage$: Observable<string>;
  prevPage$: Observable<string>;
  count$: Observable<number>;
  categories$: Observable<Categorie[]>;
  collections$: Observable<Collection[]>;
  vendeur$: Observable<Vendeursrfu>;
  vendeur: Vendeursrfu;
  vendeurId: string;
  editForm: FormGroup;
  searchForm:FormGroup;
  deal_type_display = 0;
  current_page = 1;
  placeholder = '../../../../../../assets/img/no_image_available.png';
  url$: number = -1;
  collectionForm: FormGroup;
  editAdForm: FormGroup;
  pays_field: string;
  localityByCountry$ = [];
  localites$:any;
  urlImage = "https://dfv1lq33anx1v.cloudfront.net/";
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
  

  usernameCheck = "";
  userStat = {
    username: '',
    adsCount: 0,
    existing: [],
    valide: [],
    rejete: [],
    moderation: []
  }

  topPostingCategories: any;

  filter = {
    statut:'',
    categorie:'' ,
    keyword:'',
    source:'',
    params : {}
  };
  status : any [] = [
    {id:1, nom:'En attente'},
    {id:2, nom:'Validée'},
    {id:3, nom:'Rejetée'},
    {id:4, nom:'Signalée'},
    {id:6, nom:'Supprimée'}
  ]

  acquisition : any [] = [
    {id:0, nom:'Ambassadeurs'},
    {id:1, nom:'Prospection téléphonique'},
    {id:2, nom:'Online'},
    {id:3, nom:'Autre'}
  ]
  sources:any = [];
  annoncesByStatus =  {
    existing: [],
    valide: [],
    rejete: [],
    moderation: []
  }


  categoryCounter: any;
  topSource = {
    ANDROID: 0,
    web: 0
  };
  locks$: Observable<any>
  locks: Array<Lock>;

  constructor(
    private _store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.annonces$ = _store.select(fromRoot.getAnnoncesRfu);
    this.activites$ = _store.select(fromRoot.getActivites);
    this.pays$ = _store.select(fromRoot.getPays);
    this.categories$ = _store.select(fromRoot.getCategories);
    this.collections$ = _store.select(fromRoot.getCollections);
    this.annonce$ = _store.select(fromRoot.getAnnonceRfu);
    this.user$ = _store.select(fromRoot.getSessionUser);
    this.config$ = _store.select(fromRoot.getSessionConfig);
    this.nextPage$ = _store.select(fromRoot.getAnnoncesRfuNext);
    this.prevPage$ = _store.select(fromRoot.getAnnoncesRfuPrev);
    this.count$ = _store.select(fromRoot.getAnnoncesRfuCount);
    this.status$ = _store.select(fromRoot.getAnnonceRfuStatus);
    this.vendeur$ = _store.select(fromRoot.getVendeurRfu);
    this.locks$ = _store.select(fromRoot.getRfuLocks);
    this.localities$ = _store.select(fromRoot.getLocalites);

    this.prevPage$.subscribe(val => (this.prev = val));
    this.nextPage$.subscribe(val => (this.next = val));
    this.loading = true;
    this.annoncesSearch$ = this.annonces$
    this.route.params.subscribe(params => (this.vendeurId = params['id']));
    this.subscription = this.vendeur$.subscribe(val => {
      // tslint:disable-next-line:curly
      if (val) {
        this.vendeur = val;
      }
    });
    this.count$.subscribe(val => {
      if (val !== 0) {
          if (this.vendeur && this.vendeur.username != this.userStat.username)
            this.userStat.adsCount = val;
        this.total = Math.ceil(val / 30);
      } else { this.total = 0; }
    });
    this.status$.subscribe(val => {
      if (val === true) {
        this.loading = true;
      } else { this.loading = false; }
    });
    this.annonces$.subscribe(annonces=>{
      if(annonces){
        this.annoncesByStatus.existing = annonces.filter(annonce=> !annonce.deleted);
        this.annoncesByStatus.moderation = annonces.filter(annonce=> annonce.etat==='0' && !annonce.deleted);
        this.annoncesByStatus.valide = annonces.filter(annonce=>annonce.etat==='1'&& !annonce.deleted);
        this.annoncesByStatus.rejete = annonces.filter(annonce=>annonce.etat==='2' && !annonce.deleted);
        if (this.userStat.username == '') {
          this.userStat.username = this.vendeur ? this.vendeur.username : '';
          this.userStat.existing = this.annoncesByStatus.existing;
          this.userStat.moderation = this.annoncesByStatus.moderation;
          this.userStat.valide = this.annoncesByStatus.valide;
          this.userStat.rejete = this.annoncesByStatus.rejete;
        } else if (this.vendeur && this.vendeur.username != this.userStat.username) {
          this.userStat.username = this.vendeur ? this.vendeur.username : '';
          this.userStat.existing = this.annoncesByStatus.existing;
          this.userStat.moderation = this.annoncesByStatus.moderation;
          this.userStat.valide = this.annoncesByStatus.valide;
          this.userStat.rejete = this.annoncesByStatus.rejete;
        }
      }
    });
    this.annonces$.subscribe(annonces=>{
        if(annonces){
          this.sources = Array.from(new Set(annonces.map(val=>val.source)));
        }
    });
    this.buildSearchForm();
    this.buildeditForm();

    this.annonces$.subscribe(
      (x: any) => {
          if (x) {
          this.fetchTopCategories(x);
        }
      },
      (error) => console.log(error),
      () => console.log('Completed!')
    );

    this.locks$.subscribe(locks => {
      if (locks) {

        this.locks = locks
      }
    })

  }

  ngOnInit() {
    this._store.dispatch(new sessionActions.RequestGetCurrentUserAction());
    this._store.dispatch(new categoriesActions.RequestCategories());
    this._store.dispatch(new collectionsActions.RequestCollections());
    this._store.dispatch(new annoncesRfuActions.RequestAnnoncesRfuNext());
    this._store.dispatch(new annoncesRfuActions.RequestAnnoncesRfuPrev());
    this._store.dispatch(new paysActions.RequestPays());
    this._store.dispatch(new localitesActions.RequestLocalites());
    this._store.dispatch(
      new activiteActions.RequestActivites({ user_id: 1 })
    );
    this._store.dispatch(
      new annoncesRfuActions.RequestAnnoncesRfu({ uuid: this.vendeurId })
    );
    this._store.dispatch(
      new vendeurActionsrfu.RequestVendeurRfu({ id: this.vendeurId })
    );
    this._store.dispatch(new annoncesRfuActions.RequestGetAnnoncesRfuLocks());
  }

  fetchTopCategories(annonces) {
    let category = '';
    const myArray = {};
    const res = {};
    for (const annonce of annonces) {
      if (!annonce.deleted) {
        this.fetchTopSources(annonce.source);
        category = annonce.category.name;
        if (!myArray[category]) {
          myArray[category] = 1;
        }else{
          myArray[category] += 1;
        }
        res[myArray[category]] = category;
      }
    }
    this.topPostingCategories = Object.keys(myArray);
    this.categoryCounter = myArray;
  }

  fetchTopSources (source) {
    if (source === 'web') {
      this.topSource.web += 1;
    }
    if (source === 'ANDROID') {
      this.topSource.ANDROID += 1;
    }
  }

  getPage() {
    this.current_page += 1;
    this._store.dispatch(new annoncesRfuActions.RequestAnnoncesRfu(this.next));
    this._store.dispatch(new annoncesRfuActions.RequestGetAnnoncesRfuLocks())
  }

  getPreviousPage() {
    this.current_page -= 1;
    this._store.dispatch(new annoncesRfuActions.RequestAnnoncesRfu(this.prev));
    this._store.dispatch(new annoncesRfuActions.RequestGetAnnoncesRfuLocks())
  }

  onSelectAnnonce(annonce: Annonce) {
    this._store.dispatch(new annoncesRfuActions.AnnonceRfuLock(annonce));
    // this._store.dispatch(new annoncesRfuActions.RequestGetAnnoncesRfuLocks())
  }

  edit() {
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
    jQuery('#edit-vendeur-form-modal').modal('show');
  }

  onEditFormSubmit(formValue) {
    formValue.acquisition_channel = (this.acquisition[parseInt(formValue.acquisition_channel)]).nom;
    if (formValue.address){
      formValue.latitude = this.new_vendor.latitude;
      formValue.longitude = this.new_vendor.longitude;
    }
    delete formValue['address'];
    this._store.dispatch(new vendeurActionsrfu.RequestVendeurRfuUpdate({vendor:formValue,uuid: formValue.uuid}));
    this.editForm.reset();
    jQuery('#edit-vendeur-form-modal').modal('toggle');
    this._store.dispatch(new vendeurActionsrfu.RequestVendeurRfu({ id: this.vendeurId }));

  }
  buildeditForm() {
    this.editForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      whatsapp_phone: new FormControl('', Validators.required),
      uuid: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      is_active: new FormControl(),
      acquisition_channel: new FormControl(),
      address: new FormControl(),
      address_show: new FormControl(),
      latitude: new FormControl(),
      longitude: new FormControl(),
    });
  }

  moderateAd(params) {
    // this._store.dispatch(new annoncesRfuActions.RequestUpdateAnnonceRfu(params));
    this._store.dispatch(new annoncesRfuActions.RequestGetAnnoncesRfuLocks())
  }

  generateLink(ad) {
    if (ad) {
      console.log(ad);
      this._store.dispatch(
        new annoncesRfuActions.RequestLinkAnnonceRfu({ id: ad })
      );
      this._store.dispatch(new annoncesRfuActions.RequestGetAnnoncesRfuLocks())
    }
  }

  submitImage(event) {
    // const formModel = event;
    // this._store.dispatch(
    //   new annoncesRfuActions.RequestUpdatePictureAnnonce(formModel)
    // );
  }

  deletePhoto(nbre) {
    // const params = { id: this.annonce.id
    //   , name: 'photo' + nbre };
    // this._store.dispatch(
    //   new annoncesRfuActions.RequestDeletePictureAnnonce(params)
    // );
  }

  onCollectionFormSubmit(formValue) {
    // const data = formValue;
    // data.ad_id = this.annonce.id;
    // this._store.dispatch(
    //   new annoncesRfuActions.RequestCreateAnnonceCollection(data)
    // );
    // this._store.dispatch(new annoncesRfuActions.RequestGetAnnoncesLocks())
  }

  onUpdateAnnonce(ad: Annonce) {
    // this._store.dispatch(new annoncesRfuActions.RequestGetAnnonce({ id: ad.id }));
    this._store.dispatch(new annoncesRfuActions.RequestGetAnnonceRfu({ id: ad.id }));
    this._store.dispatch(new annoncesRfuActions.RequestGetAnnoncesRfuLocks())

  }

  onFormSubmit(formValue: Object) {
    // this._store.dispatch(new annoncesRfuActions.RequestUpdateAnnonce(formValue));
    // this._store.dispatch(new annoncesRfuActions.RequestGetAnnoncesLocks())
  }

  ngChanges(changes: SimpleChanges) {
    // console.log("Changes are:", changes);
  }

  buildSearchForm(): void {
    this.searchForm = new FormGroup({
      statut: new FormControl(''),
      categorie: new FormControl(''),
      keyword: new FormControl(''),
      source: new FormControl('')
      //etat: new FormControl(this.url$)
    });

    this.searchForm.valueChanges.subscribe(data => (this.filter = data));
  }

  search(){
    if(this.filter.statut || this.filter.keyword || this.filter.categorie || this.filter.source){
        this.filter.params = { user_id: this.vendeurId, page: 1};
        this.current_page = 1;
        this._store.dispatch(
          new annoncesRfuActions.SearchElementRfu(this.filter)
        );
    }
  }

  loadAnnonces(){
    this.buildSearchForm();
    this._store.dispatch(
      new annoncesRfuActions.RequestAnnoncesRfu({ uuid : this.vendeurId })
    );
  }

  isLocked(adId: number): boolean {
    return !!this.getLock(adId)
  }

  getLock(adId: number): Lock {
    if (this.locks) {
      return this.locks.filter((lock: Lock) =>{
        return lock.ad == adId
      })[0]
    }
  }

  fetchLocksAfterClosingModal(event: Event): void {
    if (event) {
      this._store.dispatch(new annoncesRfuActions.RequestGetAnnoncesRfuLocks())
    }
  }

  getAdStatusName(ad: Annonce): string {
    return adStateFr(ad.state)
  }

  synchroniser(){
    this._store.dispatch(
      new authActions.RequestMakeSync({ user_id : this.vendeurId })
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onChangePays(c) {
    let id ;
    this.localityByCountry$ = [];
    this.pays$.subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        if (value[i].id == c.country) {
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
