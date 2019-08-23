import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Annonce } from 'app/models/annonce';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../../reducers';
import { User } from 'app/models/user';
import { Vendeur } from 'app/models/vendeur';
import { Activite } from 'app/models/activite';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare const jQuery: any;

import * as sessionActions from '../../../../../actions/session';
import * as annoncesActions from '../../../../../actions/annonces';
import * as vendeurActions from '../../../../../actions/vendeurs';
import * as categoriesActions from '../../../../../actions/categories';
import * as collectionsActions from '../../../../../actions/collections';
import * as activiteActions from '../../../../../actions/activites';
import * as paysActions from '../../../../../actions/pays';
import { Pays } from 'app/models/pays';
import { Collection } from 'app/models/collection';
import { Categorie } from 'app/models/categorie';
import { Lock } from 'app/models/lock';
import { adStateFr } from '../../../../../utils/index';
import { LockService } from '../../../../../services';

@Component({
  selector: 'app-vendeur-profile',
  templateUrl: './vendeur-profile.component.html',
  styleUrls: ['./vendeur-profile.component.css'],
})

export class VendeurProfileComponent implements OnInit {
  titre$ = 'Profil vendeur';
  user$: Observable<User>;
  config$: Observable<any>;
  annonces$: Observable<Annonce[]>;
  annoncesSearch$: Observable<Annonce[]>;
  annonce: Annonce;
  annonce$: Observable<Annonce>;
  activites$: Observable<Activite[]>;
  pays$: Observable<Pays[]>;
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
  vendeur$: Observable<Vendeur>;
  vendeur: Vendeur;
  vendeurId: number;
  editForm: FormGroup;
  searchForm:FormGroup;
  deal_type_display = 0;
  current_page = 1;
  placeholder = '../../../../../../assets/img/no_image_available.png';
  url$: number = -1;
  collectionForm: FormGroup;
  editAdForm: FormGroup;

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
    {id:0, nom:'En attente'},
    {id:1, nom:'Validée'},
    {id:2, nom:'Rejetée'},
    {id:4, nom:'Signalée'}
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
    private route: ActivatedRoute,
    private lockService: LockService
  ) {
    this.annonces$ = _store.select(fromRoot.getAnnonces);
    this.activites$ = _store.select(fromRoot.getActivites);
    this.pays$ = _store.select(fromRoot.getPays);
    this.categories$ = _store.select(fromRoot.getCategories);
    this.collections$ = _store.select(fromRoot.getCollections);
    this.annonce$ = _store.select(fromRoot.getAnnonce);
    this.user$ = _store.select(fromRoot.getSessionUser);
    this.config$ = _store.select(fromRoot.getSessionConfig);
    this.nextPage$ = _store.select(fromRoot.getAnnoncesNext);
    this.prevPage$ = _store.select(fromRoot.getAnnoncesPrev);
    this.count$ = _store.select(fromRoot.getAnnoncesCount);
    this.status$ = _store.select(fromRoot.getAnnonceStatus);
    this.vendeur$ = _store.select(fromRoot.getVendeur);
    this.locks$ = _store.select(fromRoot.getLocks)

    this.prevPage$.subscribe(val => (this.prev = val));
    this.nextPage$.subscribe(val => (this.next = val));
    this.loading = true;
    this.annoncesSearch$ = this.annonces$
    this.route.params.subscribe(params => (this.vendeurId = params['id']));
    this.vendeur$.subscribe(val => {
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
    this._store.dispatch(new annoncesActions.RequestAnnoncesNext());
    this._store.dispatch(new annoncesActions.RequestAnnoncesPrev());
    this._store.dispatch(new paysActions.RequestPays());
    this._store.dispatch(
      new activiteActions.RequestActivites({ user_id: this.vendeurId })
    );
    this._store.dispatch(
      new annoncesActions.RequestAnnonces({ user_id: this.vendeurId })
    );
    this._store.dispatch(
      new vendeurActions.RequestVendeur({ id: this.vendeurId })
    );
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
  }

  fetchTopCategories(annonces) {
    let category = '';
    const myArray = {};
    const res = {};
    for (const annonce of annonces) {
      if (!annonce.deleted) {
        this.fetchTopSources(annonce.source);
        category = annonce.categorie.nom;
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
    this._store.dispatch(new annoncesActions.RequestAnnonces(this.next));
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
  }

  getPreviousPage() {
    this.current_page -= 1;
    this._store.dispatch(new annoncesActions.RequestAnnonces(this.prev));
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
  }

  onSelectAnnonce(annonce: Annonce) {
    this._store.dispatch(new annoncesActions.AnnonceLock(annonce));
    // this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
  }

  edit() {
    this.editForm.patchValue({
      id: this.vendeur.id,
      first_name: this.vendeur.first_name,
      last_name: this.vendeur.last_name,
      email: this.vendeur.email,
      telephone: this.vendeur.telephone,
      address: this.vendeur.address,
      is_active: this.vendeur.is_active,
      pays: this.vendeur.pays,
      id_pays: this.vendeur.id_pays,
      id_type: this.vendeur.id_type,
    });
    jQuery('#edit-vendeur-form-modal').modal('show');
  }

  moderateAd(params) {
    this._store.dispatch(new annoncesActions.RequestUpdateAnnonce(params));
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
  }

  generateLink(ad) {
    if (ad) {
      this._store.dispatch(
        new annoncesActions.RequestLinkAnnonce({ id: ad })
      );
      this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
    }
  }

  submitImage(event) {
    const formModel = event;
    this._store.dispatch(
      new annoncesActions.RequestUpdatePictureAnnonce(formModel)
    );
  }

  deletePhoto(nbre) {
    const params = { id: this.annonce.id, name: 'photo' + nbre };
    this._store.dispatch(
      new annoncesActions.RequestDeletePictureAnnonce(params)
    );
  }

  buildeditForm() {
    this.editForm = new FormGroup({
      id: new FormControl(''),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      is_active: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      id_pays: new FormControl('', Validators.required),
      id_type: new FormControl('', Validators.required)
    });
  }

  onCollectionFormSubmit(formValue) {
    const data = formValue;
    data.ad_id = this.annonce.id;
    this._store.dispatch(
      new annoncesActions.RequestCreateAnnonceCollection(data)
    );
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
  }

  onEditFormSubmit(formValue) {
    this._store.dispatch(new vendeurActions.RequestVendeurUpdate(formValue));
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
  }

  onUpdateAnnonce(ad: Annonce) {
    // this._store.dispatch(new annoncesActions.RequestGetAnnonce({ id: ad.id }));
    this._store.dispatch(new annoncesActions.RequestGetAnnonce({ id: ad.id }));
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())

  }

  onFormSubmit(formValue: Object) {
    this._store.dispatch(new annoncesActions.RequestUpdateAnnonce(formValue));
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
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
          new annoncesActions.SearchElement(this.filter)
        );
    }
  }

  loadAnnonces(){
    this.buildSearchForm();
    this._store.dispatch(
      new annoncesActions.RequestAnnonces({ user_id: this.vendeurId })
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
      this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
    }
  }

  getAdStatusName(ad: Annonce): string {
    return adStateFr(ad.state)
  }

  unlock(event: Event, adId: number): void {
    const user = JSON.parse(localStorage.getItem("bo::user"));
    if (user.role === "admin") {
      event.stopPropagation();
      this.lockService.deleteLock(adId);
      setTimeout(() => {
        this._store.dispatch(new annoncesActions.RequestGetAnnoncesLocks())
      }, 200);
    }
  }
}
