import {
  Component,
  OnInit,
  Injectable,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../../models/user';
import * as fromRoot from '../../../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuditService } from '../../../../../services';
import { ModerateurService } from '../../../../../services';
import { AnnonceService } from '../../../../../services';
import { auditStatusNameFr } from 'app/utils';

@Injectable()
@Component({
  selector: 'app-audit-annonce',
  templateUrl: './audit-annonce.component.html',
  styleUrls: ['./audit-annonce.component.css']
})
export class AuditAnnonceComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  status$: Observable<any>;
  // auditList$: Observable<any>;

  loading = false;
  titre$ = 'Stats Modérateur';
  adId: number;
  moderateur$: Observable<any>;
  moderatorAdStatistical = {};
  annonces = [];
  placeholder = '../../../../../../assets/img/no_image_available.png';
  showAdAuditsModal$ = false;
  audits$ = [];
  annonce$ = [];
  usernames$ = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store<fromRoot.State>,
    private auditService: AuditService,
    private moderateurService: ModerateurService,
    private cd: ChangeDetectorRef,
    private annonceService: AnnonceService) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.adId = params['id'];
    });

    this.annonceService.getAnnonceById(this.adId).subscribe((val: Array<any>) => {
      if (val) {
        this.annonce$ = val;
      }
    });

    this.loadAudits()


    // this.auditList$ = _store.select(fromRoot.getListAudits)
    // this.auditList$.subscribe(data => {
    //   if (data && data.audits) {
    //     if (data.audits.length > 0 ) {
    //       this.loadAudits()
    //       console.log('Data audits from store was blank', data)
    //     }
    //   }
    // })
  }

  ngOnInit() {
    setTimeout(() => {
      if (!this.cd['destroyed']) {
        this.cd.detectChanges()
      }
    }, 4001)
  }

  ngOnDestroy() {
    this.cd.detach()
  }

  getModeratorById(audit) {
    if (audit.bo_user_id) {
      this.moderateurService.getModerateurById(audit.bo_user_id).subscribe((val: any) => {
        this.usernames$[audit.id] = val.data.username;
        this.cd.detectChanges();
      });
    }else {
      setTimeout(() => {
        if (this.annonce$['user']) {
          this.usernames$[audit.id] = this.annonce$['user']['first_name'] + ' ' + this.annonce$['user']['last_name'];
          if (!this.cd['destroyed']) {
            this.cd.detectChanges()
          }
        }
      }, 2001)
    }
  }

  getChangeMessageByMoment(audit, moment) {
    let res = '';
    Object.keys(audit[moment]).map(function(personNamedIndex){
      res += '<strong>' + personNamedIndex + '</strong> : ' + audit[moment][personNamedIndex] + '<br>';
    });
    return res;
  }

  getChangeMessage(audit, param) {
    if (this.getOperator(audit) === 'Modification' || this.getOperator(audit) === 'Validation' || this.getOperator(audit) === 'Rejet') {
      const change_message = JSON.parse(audit['change_message']);
      if (change_message['new'] && change_message['old']) {
        return change_message[param];
      }
    }
    return null;
  }

  performedBy(audit) {
    if (audit.bo_user_id) {
      return audit.bo_user_id;
    }else {
      return audit.user_id;
    }
  }

  performedByModerator(audit) {
    return audit.bo_user_id != null;
  }

  public getOperator(audit): string {
    return auditStatusNameFr(audit)
  }

  private loadAudits(): void {
    this.auditService.getAdAudits(this.adId).subscribe((val: any) => {
      if (val) {
        let date, ad_id, operator, performedByModerator, before, after;
        for (const data of val) {
          let audit = {};
          date = data.action_time;
          ad_id = this.adId;
          operator = this.getOperator(data);
          performedByModerator = this.performedByModerator(data);
          before = this.getChangeMessage(data, 'old');
          after = this.getChangeMessage(data, 'new');

          this.getModeratorById(data);

          audit = {
            id: data.id,
            date: date,
            ad_id: ad_id,
            operator: operator,
            user: this.performedBy(data),
            performedByModerator: performedByModerator,
            before: before,
            after: after
          };

          if (audit['before']) {
            audit['before'] = this.getChangeMessageByMoment(audit, 'before');
          }

          if (audit['after']) {
            audit['after'] = this.getChangeMessageByMoment(audit, 'after');
          }

          this.getModeratorById(data);
          this.cd.detectChanges()
          this.audits$.push(audit);
        }
      }
    });
  }
}
