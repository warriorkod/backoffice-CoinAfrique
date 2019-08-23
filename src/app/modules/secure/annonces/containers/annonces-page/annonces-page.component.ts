import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, } from '@angular/forms';
import {
  ImageCompressService,
  ResizeOptions,
  IImage
} from 'ng2-image-compress';
import swal from 'sweetalert';
import { Store } from '@ngrx/store';

import { User } from '../../../../../models/user';
import { Annonce } from '../../../../../models/annonce';
import { Categorie } from '../../../../../models/categorie';
import { Collection } from '../../../../../models/collection';
import { Pays } from '../../../../../models/pays';

import * as fromRoot from '../../../../../reducers';

import * as sessionActions from '../../../../../actions/session';
import * as annoncesActions from '../../../../../actions/annonces';
import * as categoriesActions from '../../../../../actions/categories';
import * as collectionsActions from '../../../../../actions/collections';
import * as paysActions from '../../../../../actions/pays';
import * as customType from '../../../../../models/constants';
import { Audit, AuditMessage, LastAudit } from '../../../../../models/audits';
import { updateURLParameter, auditStatusNameFr, adStateFr } from 'app/utils';
import { AnnonceService } from '../../../../../services';
import { LockService } from '../../../../../services';
import { AuditService } from '../../../../../services';
import { ModerateurService } from '../../../../../services';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'bo-annonces-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './annonces-page.component.html',
  styleUrls: ['./annonces-page.component.css']
})
export class AnnoncesPageComponent implements OnInit, OnDestroy {
  public pageSize: number = 20;
  public togglePagination : boolean = true;

  url$ = 0;
  current_page = 1;
  titre$: string;
  collectionForm: FormGroup;
  searchForm: FormGroup;
  user$: Observable<User>;
  config$: Observable<any>;
  stats$: Observable<any>;
  annonce: Annonce;
  ad: Annonce;
  annonce$: Observable<Annonce>;
  annonces$: Observable<Annonce[]>;
  categories$: Observable<Categorie[]>;
  categories: Categorie[];
  pays$: Observable<Pays[]>;
  collections$: Observable<Collection[]>;
  annonceStatus$: Observable<Boolean>;
  customType = customType;
  sub_categories: Array<Object>;
  editForm: FormGroup;
  imageForm: FormGroup;
  display_updload = 0;
  imgLoading = false;
  asyncAnnonces: Observable<Annonce[]>;
  loading = true;
  teste = false;
  loading_spinner = false;
  status$: Observable<any>;
  total: number;
  total_page: number;
  next = "";
  prev = "";
  nextPage$: Observable<string>;
  prevPage$: Observable<string>;
  count$: Observable<number>;
  selectedRow: number;
  categorie_val: Categorie;
  categories_select = Array;
  sub_categorie: Categorie;
  filter: object = {};
  page: number = null;
  labels: any = {
    previousLabel: "Previous",
    nextLabel: "Next",
    screenReaderPaginationLabel: "Pagination",
    screenReaderPageLabel: "page",
    screenReaderCurrentLabel: `You're on page`
  };
  results: object;
  directionLinks = true;
  autoHide = false;
  deal_type_display = 0;
  placeholder = "../../../assets/img/no_image_available.png";
  selectedImage: any;
  processedImages: any = [];
  showTitle = false;
  showLockedAdModal$ = false;
  checkAds$: Array<number> = [];
  adAlreadyInModeration$ = false;
  currentAdLockeds$: Object;
  allAdsLocked = {};
  isAdmin$ = false;
  mustFetchLocks = false;
  allAdsLocked$ = {};
  allAdsAudits = {};
  audits$: Observable<any>;
  searchId = null;
  adById: Annonce;

  statusSubs: any;
  auditsSubs: any;
  annoncesSubs: any;

  private readonly searchErrorRequest: any = {
    title: "Erreur",
    content: "L'id recherché n'a pas peu être trouvé.",
    value: "error"
  }

  private readonly searchErrorState: any = {
    title: "Erreur",
    content: "L'id recherché n'est pas dans l'état actuel.",
    value: "error"
  }

  constructor(
    private _store: Store<fromRoot.State>,
    private _apisService: AnnonceService,
    private imgCompressService: ImageCompressService,
    private lockService: LockService,
    private auditService: AuditService,
    private cd: ChangeDetectorRef,
    private moderateurService: ModerateurService
  ) {
    this.buildSearchForm();
    this.titre$ = "Annonces";
    this.user$ = _store.select(fromRoot.getSessionUser);
    this.config$ = _store.select(fromRoot.getSessionConfig);
    this.nextPage$ = _store.select(fromRoot.getAnnoncesNext);
    this.prevPage$ = _store.select(fromRoot.getAnnoncesPrev);
    this.count$ = _store.select(fromRoot.getAnnoncesCount);
    this.stats$ = _store.select(fromRoot.getAnnoncesStats);
    this.status$ = _store.select(fromRoot.getAnnonceStatus);
    this.annonce$ = _store.select(fromRoot.getAnnonce);
    this.annonces$ = _store.select(fromRoot.getAnnonces);
    this.pays$ = _store.select(fromRoot.getPays);
    this.categories$ = _store.select(fromRoot.getCategories);
    this.collections$ = _store.select(fromRoot.getCollections);

    this.url$ = 0;
    this.categories$.subscribe(val => {
      this.categories = val;
    });
    this.count$.subscribe(val => {
      if (val !== 0) {
        this.total = Math.ceil(val / this.pageSize);
      } else {
        this.total = 0;
      }
    });

    this.statusSubs = this.status$
      .subscribe(val => {
        this.loading = !!val
      });
    this.prevPage$.subscribe(val => (this.prev = val));
    this.nextPage$.subscribe(val => (this.next = val));
    this.annonce$.subscribe(val => {
      this.annonce = val;
      const annonce = val;
      if (val) {
        this.annonce = val;
        this.ad = val;
      }
    });

    const locks = this.lockService.getLocks();

    locks.subscribe(
      (x: any) => {
        this.currentAdLockeds$ = x;
        for (const lock of x.objects) {
          this.fetchLocks(lock.ad, lock.username);
        }
      },
      error => console.log("error => ", error),
      () => "locks Completed"
    );

    const user = JSON.parse(localStorage.getItem("bo::user"));
    if (user.role === "admin") {
      this.isAdmin$ = true;
    }
  }

  ngOnInit() {
    this.cd.detectChanges()

    this._store.dispatch(new sessionActions.RequestGetCurrentUserAction());
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 0, page_size: this.pageSize }));
    this._store.dispatch(new annoncesActions.RequestAnnoncesNext());
    this._store.dispatch(new annoncesActions.RequestAnnoncesPrev());
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesEtatStats());
    this._store.dispatch(new categoriesActions.RequestCategories());
    this._store.dispatch(new paysActions.RequestPays());
    this._store.dispatch(new collectionsActions.RequestCollections());

    const checkStorage = localStorage.getItem("bo::complete_edition");
    if (checkStorage && checkStorage === "true") {
      localStorage.setItem("bo::complete_edition", "false");
      const user_id = localStorage.getItem("bo::user_id");
      this.lockService.deleteUserLock(user_id);
    }

    this.annoncesSubs = this.annonces$.subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          const currentAnnonceIds: string = response.map(annonce => annonce.id).join(",")
        }
      },
      error => console.log(error)
    )
  }

  ngOnDestroy() {
    this._store.dispatch(new annoncesActions.ClearAnnonces())

    this.statusSubs.unsubscribe()
    this.annoncesSubs.unsubscribe()

    this.cd.detach();
  }

  fetchLocksAfterClosingModal($event) {
    if ($event) {
      this.fetchCurrentLocks();
    }
    this.mustFetchLocks = false;
  }

  fetchCurrentLocks() {
    const tmpLocks = this.lockService.getLocks();
    this.allAdsLocked = {};
    tmpLocks.subscribe(
      (x: any) => {
        this.currentAdLockeds$ = x;
        for (const lock of x.objects) {
          this.fetchLocks(lock.ad, lock.username);
          this.cd.detectChanges();
        }
      },
      error => console.log("error => ", error),
      () => console.log("locks Completed")
    );
  }

  fetchCurrentsAdsLocked(adsLocked) {
    this.currentAdLockeds$ = adsLocked;
  }

  getPicture(annonce) {
    let picture = "";
    // tslint:disable-next-line:curly
    if (annonce.photo1 && annonce.photo1.thumb) picture = annonce.photo1.thumb;
    // tslint:disable-next-line:curly
    else if (!annonce.photo1.thumb && annonce.photo2 && annonce.photo2.thumb)
      picture = annonce.photo2.thumb;
    // tslint:disable-next-line:curly
    else if (
      !annonce.photo1.thumb &&
      !annonce.photo2.thumb &&
      annonce.photo3 &&
      annonce.photo3.thumb
    )
      picture = annonce.photo3.thumb;
    // tslint:disable-next-line:curly
    else picture = this.placeholder;
    return picture;
  }

  onImageChange(fileInput: any) {
    const option: ResizeOptions = new ResizeOptions();
    const images: Array<IImage> = [];

    option.Resize_Max_Height = 700;
    option.Resize_Max_Width = 450;
    option.Resize_Quality = 80;
    option.Resize_Type = "image/png";

    ImageCompressService.filesToCompressedImageSource(
      fileInput.target.files
    ).then(observableImages => {
      observableImages.subscribe(
        image => {
          images.push(image);
          this.imageForm.get("id").setValue(this.annonce.id);
          this.imageForm.get("name").setValue("photo" + this.display_updload);
          this.imageForm.get("avatar").setValue({
            filename: image.fileName,
            filetype: image.type,
            value: image.compressedImage.imageDataUrl.split(
              "data:image/jpeg;base64,/9j/"
            )[1]
          });
          console.log(this.imageForm.value);
        },
        error => {
          console.log("Error while converting");
        }
      );
    });
  }

  refreshCache() {
    this._store.dispatch(new annoncesActions.RequestAnnonceRefreshCache({}));
  }

  getPage() {
    this.searchId = null;
    this.current_page = Number(this.current_page) + 1;
    this._store.dispatch(new annoncesActions.RequestAnnonces(this.next));
    this.fetchCurrentLocks();
  }

  getPreviousPage() {
    this.current_page -= 1;
    this._store.dispatch(new annoncesActions.RequestAnnonces(this.prev));
    this.fetchCurrentLocks();
  }

  search() {
    let arrayTmp;
    this.searchId = null;
    if (
      this.url$ == -1 &&
      this.filter["keyword"] &&
      /^\d+$/.test(this.filter["keyword"].trim())
    ) {
      const id = this.filter["keyword"].trim();
      this.searchById(id);
    } else if (this.filter["ad_id"]) {
      this.searchById(this.filter["ad_id"]);
    } else {
      arrayTmp = this.filter;
      arrayTmp["page_size"] = this.pageSize;
      this._store.dispatch(new annoncesActions.RequestAnnonces(arrayTmp));
    }
    this.count$.subscribe(val => {
      if (val !== 0) {
        this.total = Math.ceil(val / this.pageSize);
      } else {
        this.total = 0;
      }
    });
    this.resetPagination();
  }

  public checkAdInCurrentState(ad: any): boolean {
    if (this.url$ == 0 && ad.state == 1)
      return true;
    else if (this.url$ == 1 && ad.state == 2)
      return true;
    else if (this.url$ == 2 && ad.state == 3)
      return true;
    if (ad.signaled_list) {
      if (ad.signaled_list.length > 0) {
        return true;
      }
    }
    if (this.url$ == -1) {
      return true;
    }
    return false;
  }

  searchById(id) {
    let newUrl = this.url$;
    this._apisService.getAnnonce({ id: id }).subscribe(
      (data: Annonce) => {
        if (!this.checkAdInCurrentState(data)) {
          swal(this.searchErrorState.title, this.searchErrorState.content, this.searchErrorState.value);
          this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: this.url$, page_size: this.pageSize }));
          return;
        }
        this.url$ = newUrl;
        this.adById = data;
        this.searchId = id;
        this.total = 1;
        this.cd.detectChanges();
      }, error => {
        console.log(`error : ${error}`);
        swal(this.searchErrorRequest.title, this.searchErrorRequest.content, this.searchErrorRequest.value);
        this.searchForm.patchValue({
          ad_id: "",
        });
      })
  }

  resetPagination() {
    this.togglePagination = true;
    this.current_page = 1;
  }

  setClickedRow(index) {
    this.selectedRow = index;
  }

  goToPage() {
    if (Math.trunc(this.page) > 0 && this.page <= this.total) {
      this.current_page = this.page;
      const newURL = updateURLParameter(this.next, "page", this.page);
      this._store.dispatch(new annoncesActions.RequestAnnonces({ url: newURL, page_size: this.pageSize }));
      this.fetchCurrentLocks();
    }
  }

  getAdWaiting($event) {
    this.url$ = 0;
    this.searchId = null;
    this.searchForm.reset();
    this.searchForm.patchValue({
      etat: 0,
      ad_id: "",
      categorie: "",
      pays: ""
    });
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 0, page_size: this.pageSize }));
    this.resetPagination();
    this.fetchCurrentLocks();
  }

  getAllAd($event) {
    this.url$ = -1;
    this.searchId = null;
    this.searchForm.reset();
    this.searchForm.patchValue({
      etat: "",
      ad_id: "",
      categorie: "",
      pays: ""
    });
    this._store.dispatch(new annoncesActions.RequestAnnonces({ page_size: this.pageSize }));
    this.resetPagination();
    this.fetchCurrentLocks();
  }

  getValidatedAd($event) {
    this.url$ = 1;
    this.searchId = null;
    this.searchForm.reset();
    this.searchForm.patchValue({
      etat: 1,
      ad_id: "",
      categorie: "",
      pays: ""
    });
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 1, page_size: this.pageSize }));
    this.resetPagination();
    this.fetchCurrentLocks();
  }

  getRejectedAd($event) {
    this.url$ = 2;
    this.searchId = null;
    this.searchForm.reset();
    this.searchForm.patchValue({
      etat: 2,
      ad_id: "",
      categorie: "",
      pays: ""
    });
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 2, page_size: this.pageSize }));
    this.resetPagination();
    this.fetchCurrentLocks();
  }

  getSignaledAd($event) {
    this.url$ = 4;
    this.searchId = null;
    this.searchForm.reset();
    this.searchForm.patchValue({
      etat: 4,
      ad_id: "",
      categorie: "",
      pays: ""
    });
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 4, page_size: this.pageSize }));
    this.resetPagination();
    this.fetchCurrentLocks();
  }

  onSelectAnnonce(annonce: Annonce) {
    const annonce_id = annonce.id;
    const lock = this.lockService.getLock(annonce_id);
    const user = JSON.parse(localStorage.getItem("bo::user"));

    lock.subscribe(
      (x: any) => {
        if (x) {
          this.fetchLocks(annonce_id, x.username);
        }
      },
      error => {
        this._store.dispatch(new annoncesActions.RequestGetAnnonce(annonce));
        this.lockService.postLock(annonce_id);
        this.fetchLocks(annonce_id, user.username);
      },
      () => {
        if (this.allAdsLocked$[annonce_id] !== user.username) {
          this.showLockedAdModal$ = true;
        } else {
          this._store.dispatch(new annoncesActions.RequestGetAnnonce(annonce));
        }
        this.cd.detectChanges();
      }
    );
  }

  auditHistory(annonce) {
    const data = [];
    this.auditService.getAdAudits(annonce.id).subscribe(
      (x: any) => {
        if (x) {
          for (const audit of x) {
            data.push(audit);
            this.audits$[audit.id] = audit;
          }
        }
      },
      error => console.log(error),
      () => console.log("completed!")
    );

    setTimeout(() => {
      this.fetchAdAudits(this.audits$);
    }, 1001);
  }

  fetchAdAudits(data) {
    this.cd.detectChanges();
  }

  auditAd(annonce: Annonce) {
    let res = {};
    this.auditService.getAdAudits(annonce.id).subscribe(
      (x: any) => {
        if (x && x[0]) {
          res = x[0];
          //this.completeAuditData(tmp);
          this.allAdsAudits[annonce.id] = this.formatLastAd(res);
        }
      },
      error => console.log(error),
      () => {
        console.log();
      }
    );
  }

  completeAuditData(audit) {
    this.moderateurService.getModerateurById(audit["bo_user"]).subscribe((x: any) => {
      audit["bo_user"] = x.data.username;
    });
  }

  getLastAdAudit(annonce: Annonce) {
    let res = {};
    this.auditService.getAdAudits(annonce.id).subscribe(
      (x: any) => {
        res = x[0];
        this.allAdsAudits[annonce.id] = res;
      },
      error => console.log(error),
      () => console.log("locks Completed")
    );

    setTimeout(() => {
      return res;
    }, 1001);
  }

  closeLockedAdModal() {
    this.showLockedAdModal$ = false;
    this.cd.detectChanges();
  }

  isLocked(annonce_id) {
    return this.allAdsLocked$[annonce_id] !== undefined;
  }

  unlock(annonce_id) {
    const user = JSON.parse(localStorage.getItem("bo::user"));
    if (user.role === "admin") {
      this.lockService.deleteLock(annonce_id);
      setTimeout(() => {
        this.allAdsLocked$[annonce_id] = undefined;
        this.fetchCurrentLocks();
        this.cd.detectChanges();
      }, 2001);
    }
  }

  fetchLocks(annonce_id, username) {
    if (this.allAdsLocked$[annonce_id] === undefined) {
      this.allAdsLocked$[annonce_id] = username;
      this.cd.detectChanges();
    }
  }

  onUpdateAnnonce(ad: Annonce) {
    this._store.dispatch(new annoncesActions.RequestGetAnnonce({ id: ad.id }));
  }

  onFormSubmit(formValue: Object) {
    console.log(formValue);
    this._store.dispatch(new annoncesActions.RequestUpdateAnnonce(formValue));
  }

  onResetAnnonce() {
    this._store.dispatch(new annoncesActions.RequestResetAnnonceComplete());
    this.annonce$ = null;
  }

  onCollectionFormSubmit(formValue) {
    const data = formValue;
    data.ad_id = this.ad.id;
    this._store.dispatch(
      new annoncesActions.RequestCreateAnnonceCollection(data)
    );
  }

  buildSearchForm(): void {
    this.searchForm = new FormGroup({
      ad_id: new FormControl(""),
      pays: new FormControl(""),
      categorie: new FormControl(""),
      keyword: new FormControl(""),
      etat: new FormControl(this.url$)
    });

    this.searchForm.valueChanges.subscribe(data => (this.filter = data));
  }

  moderateAd(params) {
    this._store.dispatch(new annoncesActions.RequestUpdateAnnonce(params));
    setTimeout(() => {
      this.focusOnNextAd();
    }, 1001);
  }

  focusOnNextAd() {
    this.stayOnCurrentPage();
    setTimeout(() => {
      const scrollToRow =
        this.selectedRow > 0 ? this.selectedRow - 1 : this.selectedRow;
      const el = document.getElementById(scrollToRow.toString());
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }, 2001);
  }

  stayOnCurrentPage() {

    const newURL = this.next
      ? updateURLParameter(this.next, "page", this.current_page)
      : this.updatedUrlWithFilter()

    this._store.dispatch(new annoncesActions.RequestAnnonces({ url: newURL, page_size: this.pageSize }));
  }

  private updatedUrlWithFilter(): string {
    let url: string = `${environment.SERVER_URL}/api/bo-annonces/`
    url += `?etat=${this.url$}`
    url += `&${this.queryFilterParameters()}`
    url += `&page=${this.current_page}`
    return url
  }

  private queryFilterParameters(): string {
    return Object.keys(this.filter).map((key: string) => {
      if (this.filter[key]) {
        return `${key}=${this.filter[key]}`
      }
    }).join("&")
  }

  generateLink(ad) {
    if (ad) {
      this._store.dispatch(new annoncesActions.RequestLinkAnnonce({ id: ad }));
      this.lockService.deleteLock(ad.id);
      setTimeout(() => {
        this.allAdsLocked$[ad] = undefined;
        this.fetchCurrentLocks();
        this.cd.detectChanges();
      }, 2001);
    }
  }

  submitImage(event) {
    const formModel = event;
    this._store.dispatch(
      new annoncesActions.RequestUpdatePictureAnnonce(formModel)
    );
  }

  deletePhoto(nbre) {
    const params = { id: this.annonce.id, name: "photo" + nbre };
    this._store.dispatch(
      new annoncesActions.RequestDeletePictureAnnonce(params)
    );
  }

  getAdStatusName(ad: Annonce): string {
    return ad ? adStateFr(ad.state) : ''
  }

  private setAllAdsAudits(lastAudits: Array<Audit>): void {
    lastAudits.forEach((auditData: Audit) => {
      const auditId: string = (auditData as any).object_id
      this.allAdsAudits[auditId] = this.formatLastAd(auditData)
    })
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  private formatLastAd(auditData: Audit|any): LastAudit {
    let auditMessage: AuditMessage = JSON.parse(auditData.change_message as string)
    if (!!auditMessage.new) {
      auditMessage = auditMessage.new
    }

    return {
      'operator': auditStatusNameFr(auditData),
      'action_time': auditData.action_time,
      'bo_user': auditData.bo_user_id
    }
  }
}
