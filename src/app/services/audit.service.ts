import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';
import { ModerateurService } from './moderateur.service';
import { Observable } from 'rxjs';
import { Moderateur } from '../models/moderateur';


@Injectable()
export class AuditService extends ApisBaseService {
  redirect_url: string;
  user: Observable<Moderateur>;

  constructor(protected _http: HttpClient, private moderateurService: ModerateurService) {
    super(_http);
    this.user = JSON.parse(localStorage.getItem('bo::user'));
  }


  getAudits() {
    const url = `${environment.BO_SRV_URL}/api/bo/ad-locks/`;
    return this.getRequest(url);
  }

  getAdAudits(id) {
    const url = `${environment.SERVER_URL}/api/bo/audit/ad/${id}`;
    return this.getRequest(url);
  }

  getAdAuditsByUser(id) {
    const url = `${environment.SERVER_URL}/api/bo/audit/bo-user/${id}/ad/`;
    return this.getRequest(url);
  }

  getAudit(ad) {
    const url = `${environment.BO_SRV_URL}/bo/ad-locks/ad/${ad}/`;
    const res = this.getLockRequest(url);
    return res;
  }

  postAudit(ad) {
    const url = `${environment.BO_SRV_URL}/bo/ad-locks/`;
    const res = this.postRequest(url, {ad});
    res.subscribe(val => console.log(''));
    return res;
  }

  deleteUserAudit(user_id) {
    const url = `${environment.BO_SRV_URL}/bo/ad-locks/user/${user_id}/`;
    const res = this.deleteRequest(url);
    res.subscribe(val => console.log(''));
    return res;
  }

  deleteAudit(ad) {
    const url = `${environment.BO_SRV_URL}/bo/ad-locks/ad/${ad}/`;
    const res = this.deleteRequest(url);
    res.subscribe(val => console.log(''));
    return res;
  }

  getListAudits(adsList: string): Observable<any> {
    return this.getAdAudits(`?list=${adsList}`)
  }
}
