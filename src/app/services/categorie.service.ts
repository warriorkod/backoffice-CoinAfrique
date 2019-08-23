import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';

@Injectable()
export class CategorieService extends ApisBaseService {
  redirect_url: string;

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  getCategorie(params) {
    const url = `${environment.API_URL}/categories/${params.id}/`;
    return this.getRequest(url);
  }

  getCategories() {
    const url = `${environment.SERVER_URL}/category/`;
    return this.getRequest(url);
  }

  postCategorie(params) {
    const url = `${environment.API_URL}/categories/`;
    return this.postRequest(url, params);
  }

  putCategorie(params) {
    const url = `${environment.API_URL}/categories/${params.id}`;
    return this.putRequest(url, params);
  }

  deleteCategorie(params) {
    const url = `${environment.API_URL}/categories/${params.id}`;
    return this.deleteRequest(url);
  }

}
