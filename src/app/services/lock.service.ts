

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';
import { ModerateurService } from './moderateur.service';
import { Observable } from 'rxjs';
import { Moderateur } from '../models/moderateur';




@Injectable()
export class LockService extends ApisBaseService {
  redirect_url: string;
  user: Observable<Moderateur>;

  constructor(protected _http: HttpClient, private moderateurService: ModerateurService) {
    super(_http);
    this.user = JSON.parse(localStorage.getItem('bo::user'));
  }

  getLocks() {
    const url = `${environment.BO_SRV_URL}/bo/ad-locks/`;
    return this.getRequest(url);
  }

  getLock(ad: number): Observable<any> {
    const url = `${environment.BO_SRV_URL}/bo/ad-locks/ad/${ad}/`;
    return this.getLockRequest(url);
  }

  postLock(ad) {
    const url = `${environment.BO_SRV_URL}/bo/ad-locks/`;
    const res = this.postRequest(url, {ad});
    res.subscribe(val => console.log('post lock complete', val));
    return res;
  }

  deleteUserLock(user_id) {
    const url = `${environment.BO_SRV_URL}/bo/ad-locks/user/${user_id}/`;
    const res = this.deleteRequest(url);
    res.subscribe(val => console.log(''));
    return res;
  }

  deleteLock(ad) {
    const url = `${environment.BO_SRV_URL}/bo/ad-locks/ad/${ad}/`;
    const res = this.deleteRequest(url);
    res.subscribe(val => console.log('Lock deleted'));
    return res;
  }
}
