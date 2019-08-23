import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApisBaseService } from "./base.service";
import { environment } from "../../environments/environment";
import { Observable, throwError as observableThrowError } from "rxjs";
import { IImageData } from "app/models/banner";
import { catchError } from 'rxjs/operators';


@Injectable()
export class BannersService extends ApisBaseService {
  public readonly BANNERS_ENDPOINT: string = `${environment.BO_SRV_URL}/bo/banners/`

  constructor(protected _http: HttpClient) {
    super(_http)
  }

  public getList(queryParams: string): Observable<any> {
    let url: string = this.BANNERS_ENDPOINT
    if (queryParams) { url += queryParams }
    return this.getRequest(url)
  }

  public getShow(bannerId: number): Observable<any> {
    const url = this.BANNERS_ENDPOINT + `${bannerId}`
    return this.getRequest(url)
  }

  public putEdit(bannerId: number, payload: any): Observable<any> {
    const url = this.BANNERS_ENDPOINT + `${bannerId}`
    return this.putRequest(url, payload)
  }

  public postCreate(payload: any): Observable<any> {
    const url = this.BANNERS_ENDPOINT
    return this.postRequest(url, payload)
  }

  public delete(bannerId: number): Observable<any> {
    const url = this.BANNERS_ENDPOINT + `${bannerId}`
    return this.deleteRequest(url)
  }

  public getPreSignedUrl(queryParams: string): Observable<any> {
    let url = this.BANNERS_ENDPOINT + 'presignedurl/'
    if (queryParams) { url += queryParams }
    return this.getRequest(url)
  }

  public upload(link: string, file: IImageData): Observable<any> {
    const linkParams: URLSearchParams = new URLSearchParams(link);
    const contentType: string = linkParams.get('content-type');

    return this._http
      .put(
        link,
        file.file,
        {
          headers: {
            "Content-Type": contentType
          }
        }
      )
      .pipe(
        catchError(e => {
          if (e.status === 403) {
            return observableThrowError(`Upload access denied: ${e}`);
          }
          return observableThrowError(e);
        })
      );
  }
}
