import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable ,  Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { User } from '../../../../../models/user';
import { Pays } from '../../../../../models/pays';
import { Annonce } from '../../../../../models/annonce';
import { Categorie } from '../../../../../models/categorie';

import * as fromRoot from '../../../../../reducers';

import * as sessionActions from '../../../../../actions/session';
import * as annoncesActions from '../../../../../actions/annonces';
import * as paysActions from '../../../../../actions/pays';
import * as categoriesActions from '../../../../../actions/categories';

import { LockService } from '../../../../../services';

@Component({
  selector: 'bo-annonce-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bo-header [title]="titre$"></bo-header>
    <div class="container-fluid">
      <bo-annonce-form
        [annonce]="annonce$ | async" [pays]="pays$ | async" (moderateAd)="moderateAd($event)"
        [categories]="categories$ | async" (onFormSubmit)="onSubmitAnnonce($event)"
        (submitImage)="submitImage($event)">
      </bo-annonce-form>
    </div>
    `,
  styleUrls: ['./annonce-edit.component.css']
})

export class AnnonceEditComponent implements OnInit {
  titre$: string;
  _annonceId: string;
  actionSubscription: Subscription;
  annonce$: Observable<Annonce>;
  user$: Observable<User>;
  pays$: Observable<Pays[]>;
  categories$: Observable<Categorie[]>;
  currentEditAnnonce: Annonce;

  constructor(
    private _store: Store<fromRoot.State>,
    private _route: ActivatedRoute,
    private router: Router,
    private lockService: LockService) {
    this.titre$ = 'Edition Annonce';
    this.annonce$ = _store.select(fromRoot.getAnnonce);
    this.categories$ = _store.select(fromRoot.getCategories);
    this.pays$ = _store.select(fromRoot.getPays);
    // this.status$ = _store.select(fromRoot.getPaysStatus);
    this.annonce$.subscribe( val => {
      this.currentEditAnnonce = val;
    });
    this.actionSubscription = _route.params
      .subscribe(data => this._annonceId = data.id);
      router.events.subscribe(val => {
        if (this.currentEditAnnonce) {
          if (this.router.url != ("/annonces/" + this.currentEditAnnonce.id + '/edit')) {
            this.lockService.deleteLock(this.currentEditAnnonce.id);
          }
        }
      });
  }

  ngOnInit() {
    this._store.dispatch(new sessionActions.RequestGetCurrentUserAction);
    this._store.dispatch(new categoriesActions.RequestCategories);
    this._store.dispatch(new paysActions.RequestPays);
    if (this._annonceId) {
      this._store.dispatch(new annoncesActions.RequestGetAnnonce({ 'id': this._annonceId }));
    }
  }

  onSubmitAnnonce(annonce) {

    // validating an ad
    if (annonce.etat === 1) {
      annonce.state = 2;
    }

    // rejecting an ad
    if (annonce.etat === 2) {
      annonce.state = 3;
    }

    this._store.dispatch(new annoncesActions.RequestEditAnnonce(annonce));
  }

  submitImage(event) {
    this._store.dispatch(
      new annoncesActions.RequestUpdatePictureAnnonce(event)
    );
  }

  moderateAd(params) {
    this._store.dispatch(new annoncesActions.RequestUpdateAnnonce(params));
  }

}
