

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';

import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable()
export class SessionService extends ApisBaseService {
  redirect_url: string;
  helper: JwtHelperService;

  constructor(protected _http: HttpClient) {
    super(_http);
    this.helper = new JwtHelperService();
  }

  isLogged() {
    const token = localStorage.getItem('bo::token');
    const user = localStorage.getItem('bo::user');
    // tslint:disable-next-line:curly

    if(this.helper.isTokenExpired(token)) {
      this.destroyAuth();
    }

    if (token && user) 
      return !this.helper.isTokenExpired(token);
      
    return false;
  }

  getCurrentUser() {
    const url = `${environment.API_URL}/users/current_user/`;
    return this.getRequest(url);
  }

  postOauth(credential) {
    const url = `${environment.BO_SRV_URL}/bo/auth/login`;
    return this.postRequest(url, credential);

  }

  destroyAuth() {
    const url = `${environment.BO_SRV_URL}/bo/auth/logout`;
    return this.postRequest(url, {});
  }

}
