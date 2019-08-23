import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../../models/user';
import * as fromRoot from '../../../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuditService } from '../../../../../services';
import { ModerateurService } from '../../../../../services';

@Injectable()
@Component({
  selector: 'app-moderateur-profile',
  templateUrl: './moderateur-profile.component.html',
  styleUrls: ['./moderateur-profile.component.css']
})
export class ModerateurProfileComponent implements OnInit {

  user$: Observable<User>;
  status$: Observable<any>;

  loading = false;
  titre$ = 'Stats Modérateur';
  userId: number;
  moderateur$: Observable<any>;
  moderatorAdStatistical = {
    username: null,
    firstname: null,
    lastname: null,
    nbrOfModerateAd: null,
    nbrOfValidatedAds: null,
    nbrOfRejectedAds: null,
    nbrOfEditedAds: null
  };
  annonces = [];
  placeholder = '../../../../../../assets/img/no_image_available.png';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store<fromRoot.State>,
    private auditService: AuditService,
    private moderateurService: ModerateurService,
    private cd: ChangeDetectorRef) {
    this.status$ = _store.select(fromRoot.getListAuditsStatus);
    this.loading = true;
    this.status$ = _store.select(fromRoot.getListAuditsStatus);
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId);
    });
    this.status$.subscribe(val => {
      if (val === true) {
        this.loading = true;
        // tslint:disable-next-line:curly
      } else
        this.loading = false;
    });

    this.moderateurService.getModerateurById(this.userId).subscribe((val: any) => {
      if (val && val.data) {
        this.moderateur$ = val.data;
        this.moderatorAdStatistical['username'] = this.moderateur$['username'];
        this.moderatorAdStatistical['lastname'] = this.moderateur$['lastname'];
        this.moderatorAdStatistical['firstname'] = this.moderateur$['firstname'];
      }
    });

    this.auditService.getAdAuditsByUser(this.userId).subscribe(
      (x: any) => {
        if (x) {
          let countNbrValidatedAds = 0;
          let countNbrRejectedAds = 0;
          this.annonces = x.results;

          for (const data of x.results) {
            if (data.state === '2') {
              countNbrValidatedAds++;
            }
            if (data.state === '3') {
              countNbrRejectedAds++;
            }
          }

          const y = x.length - countNbrValidatedAds - countNbrRejectedAds;

          const countNbrEditedAds = y > 0 ? y : 0;
          this.moderatorAdStatistical['nbrOfModerateAd'] = x.length;
          this.moderatorAdStatistical['nbrOfValidatedAds'] =  countNbrValidatedAds;
          this.moderatorAdStatistical['nbrOfRejectedAds'] = countNbrRejectedAds;
          this.moderatorAdStatistical['nbrOfEditedAds'] = countNbrEditedAds;
        }
      },
      (error) => console.log(error),
      () => console.log('Completed!')
    );

  }

  ngOnInit() {
    console.log('uSerid', this.userId);
  }

  getPicture(annonce) {
    let picture = '';
    // tslint:disable-next-line:curly
    if (annonce.photo1 && annonce.photo1.thumb)
      picture = annonce.photo1.thumb;
    // tslint:disable-next-line:curly
    else if (!annonce.photo1.thumb && annonce.photo2 && annonce.photo2.thumb)
      picture = annonce.photo2.thumb;
    // tslint:disable-next-line:curly
    else if (!annonce.photo1.thumb && !annonce.photo2.thumb && annonce.photo3 && annonce.photo3.thumb)
      picture = annonce.photo3.thumb;
    // tslint:disable-next-line:curly
    else
      picture = this.placeholder;
    return picture;
  }

}
