import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';
import { LockService } from './lock.service';

@Injectable()
export class IsahitService extends ApisBaseService {
  redirect_url: string;

  constructor(protected _http: HttpClient, private lockService: LockService) {
    super(_http);
  }

  getIsahitToken() {
    const url = `${environment.BO_SRV_URL}/isahit/authentication/isahit`;
    return this.getRequest(url);
  }

  getIsahitTask(query?: string): Observable<any> {
    var url = `${environment.BO_SRV_URL}/isahit/task`;

    if (query) {
      url += query;
    }
    return this.getIsahitRequest(url);
  }

  getIsahitTaskCSV(query?) {
    var url = `${environment.BO_SRV_URL}/isahit/task`;

    if (query) {
      url += query;
    }
    return this.getCSVRequest(url);
  }

  postToken(params) {
    const url = `${environment.BO_SRV_URL}/isahit/authentication/isahit`;
    return this.postRequest(url, params);
  }

  postBatch(params) {
    const url = `${environment.BO_SRV_URL}/isahit/batch`;
    return this.postRequest(url, params);
  }

  getBatchStats(queryParams?: string): Observable<any> {
    let url = `${environment.BO_SRV_URL}/isahit/batch/stats`;

    if (queryParams) {
      url += queryParams;
    }

    return this.getRequest(url);
  }

  getIsahitParameters() {
    const url = `${environment.BO_SRV_URL}/isahit/parameters`;
    return this.getRequest(url);
  }

  putIsahitParameter(parameterId: number, payload: any): Observable<any> {
    const url = `${environment.BO_SRV_URL}/isahit/parameters/${parameterId}`
    return this.putRequest(url, {vendor: payload})
  }
}
