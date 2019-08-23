import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ApisBaseService } from "./base.service";
import { Observable } from "rxjs";

@Injectable()
export class ModerateurService extends ApisBaseService {
  constructor(protected _http: HttpClient) {
    super(_http);
  }

  getModerateurs() {
    const url = `${environment.BO_SRV_URL}/bo/users?per_page=30&page=1`;
    return this.getRequest(url);
  }

  getModerateursOnPageN(page_number) {
    const url = `${
      environment.BO_SRV_URL
    }/bo/users?per_page=30&page=${page_number}`;
    return this.getRequest(url);
  }

  getFreelancers() {
    const url = `${
      environment.BO_SRV_URL
    }/bo/users?role=freelancer&per_page=20&page=1`;
    return this.getRequest(url);
  }

  getModerateur(params) {
    const url = `${environment.BO_SRV_URL}/bo/users/${params.user_id}`;
    return this.getRequest(url);
  }

  getModerateurById(id) {
    const url = `${environment.BO_SRV_URL}/bo/users/${id}`;
    return this.getRequest(url);
  }

  getFreelancer(params) {
    const url = `${environment.BO_SRV_URL}/bo/users/${params}`;
    return this.getRequest(url);
  }

  getFreelancerEvents(params) {
    const url = `${environment.BO_SRV_URL}/bo/events/?date_start=${
      params.date_start
    }&date_end=${params.date_end}&commercial_code=${params.commercial_code}`;
    return this.getRequest(url);
  }

  updateModerateur(params) {
    console.log(params);
    const url = `${environment.BO_SRV_URL}/bo/users/${params.user_id}`;
    return this.putRequest(url, params);
  }

  updateModerateurPassword(params) {
    const url = `${environment.BO_SRV_URL}/bo/users/${params.user_id}/password`;
    return this.putRequest(url, params);
  }

  createModerateur(params): Observable<any> {
    const url = `${environment.BO_SRV_URL}/bo/users`;
    return this.postRequest(url, params);
  }

  deleteModerateur(params) {
    const url = `${environment.BO_SRV_URL}/bo/users/${params.user_id}`;
    return this.deleteRequest(url);
  }
}
