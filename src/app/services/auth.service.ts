import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';

@Injectable()
export class AuthService extends ApisBaseService {
  redirect_url: string;

  constructor(protected _http: HttpClient) {
    super(_http);
  }
  synchroniser(params){
    const url = `${environment.BO_SRV_URL}/bo/vendor/user/${params.user_id}/sync`;
    return this.postRequest(url, params);
  }
}