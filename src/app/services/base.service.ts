
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { error } from 'protractor';


export class ApisBaseService {

  constructor(protected _http: HttpClient) { }

  getRequest(url) {
    const token = localStorage.getItem('bo::token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 'X-API-KEY': environment.X_API_KEY, 
    });
    const options = { headers: headers };

    return this._http.get(url, options).pipe(
      catchError(e => {
        if (e.status === 401) {
          this.redirect();
          return observableThrowError('Unauthorized');
        } else if (e.status === 404) {
          return observableThrowError('Not found');
        } else if (e.status === 400) {
          return observableThrowError('Wrong requrest data')
        } else if (e.status == 403) {
          return observableThrowError("Forbidden")
        }
      }));
  }

  getIsahitRequest(url) {
    var req;
    const token = localStorage.getItem('bo::token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const options = { headers: headers };

    return this._http.get(url, options).pipe(
      catchError(e => {
        if (e.status === 401) {
          this.redirect();
          return observableThrowError('Unauthorized');
        } else if (e.status === 404) {
          return observableThrowError('Lock not found');
        }else if (e.status === 400) {
          return observableThrowError('You got 400');
        }else if (e.status === 403) {
          return observableThrowError('You got 403');
        }
        return observableThrowError(e);
      }));
  }

  getCSVRequest(url){
    const token = localStorage.getItem('bo::token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-API-KEY': environment.X_API_KEY,
      'Accept': "text/csv"
    });

    const options = { headers: headers, responseType: 'text' as any };

    return this._http.get(url, options).pipe(
      catchError(e => {
        if (e.status === 401) {
          this.redirect();
          return observableThrowError('Unauthorized');
        } else if (e.status === 404) {
          return observableThrowError('Lock not found');
        }
      }));
  }

  getLockRequest(url) {
    const token = localStorage.getItem('bo::token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 'X-API-KEY': environment.X_API_KEY
    });
    const options = { headers: headers };

    return this._http.get(url, options).pipe(
      catchError(e => {
        if (e.status === 404) { 
          return observableThrowError('Lock not found');
        }
      }));
  }

  deleteRequest(url) {
    const token = localStorage.getItem('bo::token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
      'X-API-KEY': environment.X_API_KEY
    });

    const options = { headers: headers };
    return this._http.delete(url, options).pipe(
      catchError(e => {
        if (e.status === 401) {
          this.redirect();
          return observableThrowError('Unauthorized');
        }
      }));
  }

  postRequest(url, params, backend: boolean = true) {
    let token;
    let headers: HttpHeaders;
    if(backend){
      token = localStorage.getItem('bo::token');
      headers = new HttpHeaders({
        Authorization: `Bearer ${token}`, 'Content-type': 'application/json', 'X-API-KEY': environment.X_API_KEY, 
      });
    }
    else {
      headers = new HttpHeaders({
       'Content-type': 'application/json'
      });
    }
    const options = { headers: headers };

    return this._http
      .post(url, params, options).pipe(
      catchError(e => {
        console.log(e);
        if (e.status === 401) {
          this.redirect();
          return observableThrowError('Unauthorized');
        }
        return observableThrowError(e);
      }));
  }

  postRequestBis(url, params, backend: boolean = true) {
    let token;
    let headers: HttpHeaders;
    if(backend){
      token = localStorage.getItem('bo::token');
      headers = new HttpHeaders({
        Authorization: `Bearer ${token}`, 'Content-type': 'application/json', 'X-API-KEY': environment.X_API_KEY
      });
    }
    else {
      headers = new HttpHeaders({
       'Content-type': 'application/json'
      });
    }
    const options = { headers: headers };
    console.log(options);

    return this._http.post(url, params, options).subscribe(data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      }); 
  }

  putRequest(url, params, additionalHeaders: any = null) {
    const token = localStorage.getItem('bo::token');

    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
      'X-API-KEY': environment.X_API_KEY
    });

    if (additionalHeaders) {
      Object.keys(additionalHeaders).forEach((key: string) => {
        headers.append(key, additionalHeaders[key])
      })
    }
    const options = { headers: headers };

    return this._http
      .put(url, params, options).pipe(
      catchError(e => {
        if (e.status === 401) {
          this.redirect();
          return observableThrowError('Unauthorized');
        }
        return observableThrowError(e);
      }));
  }

  redirect() {
    localStorage.clear();
    if (window.location.pathname !== '/sign_in') {
      window.location.href = '/sign_in';
    }
  }

}
