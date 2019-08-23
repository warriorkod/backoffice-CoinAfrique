import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';

@Injectable()
export class VendeursrfuService extends ApisBaseService {
  redirect_url: string;

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  getVendeur(params) {
    const url = `${environment.BO_SRV_URL}/bo/vendor/user/${params.id}`;
    return this.getRequest(url);
  }

  getVendeurs(params: any = null) {
    let urlbis = new URL(`${environment.BO_SRV_URL}/bo/vendor/user/`);
    let url = new URL(urlbis+`?page=1&page_size=30`);

    if (params) {
      if (typeof params === 'object' && params.hasOwnProperty('keyword')) {
        if (params['keyword']) {
          // urlbis.searchParams.set('name', params['keyword']);
          url = new URL(``+urlbis+'?name='+params['keyword']+'&page_size=30');

        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('pays')) {
        if (params['pays']) {
          // url.searchParams.set('pays', params['pays']);
          url = new URL(``+urlbis+'?country_code='+params['pays']+'&page_size=30');
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('last_signin')) {
        if (params['last_signin']) {
          // url.searchParams.set('last_login', params['last_login']);
          url = new URL(``+urlbis+'?last_login_days='+params['last_signin']+'&page_size=30');
        }
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('inscrit_moins_de')
      ) {
        if (params['inscrit_moins_de']) {
          // url.searchParams.set('inscrit_moins_de', params['inscrit_moins_de']);
          url = new URL(``+urlbis+'?joined_days='+params['inscrit_moins_de']+'&page_size=30');
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('last_posting')) {
        if (params['last_posting']) {
          // url.searchParams.set('last_posting', params['last_posting']);
          url = new URL(``+urlbis+'?last_posting_days='+params['last_posting']+'&page_size=30');
        }
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('nbre_annonces') && params['nbre_annonces']
      ) {
        url = new URL(``+urlbis+'?ads_count='+params['nbre_annonces']+'&page_size=30');
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('nbre_produits_vendus') && params['nbre_produits_vendus']
      ) {
        url = new URL(``+urlbis+'?sold_count='+params['nbre_produits_vendus']);
      }

      if (typeof params === 'string' && params != null) {
        // url = new URL(params);
          url = new URL(``+urlbis+params);
      }
    }
    return this.getRequest(url.href);
  }

  getVendeursExport(params: any = null) {
    let url = new URL(`${environment.SERVER_URL}/api/bo-vendeurs/`);

    if (params) {
      if (typeof params === 'object' && params.hasOwnProperty('keyword')) {
        if (params['keyword']) {
          url.searchParams.set('keyword', params['keyword']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('pays')) {
        if (params['pays']) {
          url.searchParams.set('pays', params['pays']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('last_login')) {
        if (params['last_login']) {
          url.searchParams.set('last_login', params['last_login']);
        }
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('inscrit_moins_de')
      ) {
        if (params['inscrit_moins_de']) {
          url.searchParams.set('inscrit_moins_de', params['inscrit_moins_de']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('last_posting')) {
        if (params['last_posting']) {
          url.searchParams.set('last_posting', params['last_posting']);
        }
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('nbre_annonces')
      ) {
        if (params['nbre_annonces']) {
          url.searchParams.set('nbre_annonces', params['nbre_annonces']);
        }
      }
      if (
        typeof params === 'object' && params.hasOwnProperty('nbre_produits_vendus')
      ) {
        if (params['nbre_produits_vendus']) {
          url.searchParams.set('nbre_produits_vendus', params['nbre_produits_vendus']);
        }
      }

      if (typeof params === 'string' && params != null) {
        url = new URL(params);
      }
    }
    return this.getCSVRequest(url.href);
  }

  putVendeur(params) {
    const url = `${environment.BO_SRV_URL}/bo/vendor/user/${params.uuid}`;
    return this.putRequest(url, params.vendor);
  }

  postVendor(params) {
    const url = `${environment.BO_SRV_URL}/bo/vendor/user`;
    return this.postRequest(url, params);
  }

  getActivites(params: any = null) {
    const url = new URL(`${environment.SERVER_URL}/api/bo-activites/`);
    if (params) {
      if (typeof params === 'object' && params.hasOwnProperty('user_id')) {
        if (params['user_id']) {
          url.searchParams.set('user_id', params['user_id']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('page_size')) {
        if (params['page_size']) {
          url.searchParams.set('page_size', params['page_size']);
        }
      }

      if (typeof params === 'object' && params.hasOwnProperty('page')) {
        if (params['page']) {
          url.searchParams.set('page', params['page'])
        }
      }
    }
    return this.getRequest(url.href);
  }

}
