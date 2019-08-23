import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';
import { LockService } from './lock.service';
import { FullAnnonceLink, AnnonceLink } from './annonce.service/helpers';

@Injectable()
export class AnnonceService extends ApisBaseService {
  redirect_url: string;

  constructor(protected _http: HttpClient, private lockService: LockService) {
    super(_http);
  }

  getAnnonce(params) {
    const url = `${environment.SERVER_URL}/api/bo-annonces/${params.id}/`;
    return this.getRequest(url);
  }

  getAnnonceById(id) {
    const url = `${environment.SERVER_URL}/api/bo-annonces/${id}/`;
    return this.getRequest(url);
  }

  getAnnonces(params: any = null) {
    let url = new URL(`${environment.SERVER_URL}/api/bo-annonces/`);

    if (params) {
      if (typeof params === 'object' && params.hasOwnProperty('user_id')) {
        if (params['user_id']) {
          url.searchParams.set('user_id', params['user_id']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('categorie')) {
        if (params['categorie']) {
          url.searchParams.set('categorie', params['categorie']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('pays')) {
        if (params['pays']) {
          url.searchParams.set('pays', params['pays']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('keyword')) {
        if (params['keyword']) {
          url.searchParams.set('keyword', params['keyword']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('filter')) {
        if (params['filter']) {
          url.searchParams.set('filter', params['filter']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('etat')) {
        url.searchParams.set('etat', params['etat']);
        if (params['etat'] === 0 ) {
          this.lockService.getLocks();
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('page_size')) {
        if (params['page_size']) {
          url.searchParams.set('page_size', params['page_size']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('page')) {
        if (params['page']) {
          url.searchParams.set('page', params['page']);
        }
      }
      if (typeof params == 'object' && params.hasOwnProperty('url')) {
        if (params['url']) {
          url = new URL(params["url"]);
        }      
      }
      if (typeof params === 'string' && params != null) {
        url = new URL(params);
      }
    }

    return this.getRequest(url.href);
  }

  postAnnonceCollection(params) {
    const url = `${environment.SERVER_URL}/api/bo/add_to_collection/`;
    return this.postRequest(url, params);
  }

  deletePhoto(params) {
    const url = `${environment.SERVER_URL}/api/bo/delete_picture/`;
    return this.postRequest(url, params);
  }

  updatePicture(params) {
    const url = `${environment.SERVER_URL}/api/bo/picture_upload/`;
    return this.postRequest(url, params);
  }

  getAnnoncesStats(params) {
    const url = `${environment.SERVER_URL}/api/bo/annonces_etat_stats/`;
    return this.getRequest(url);
  }

  putAnnonce(params) {
    const url = `${environment.SERVER_URL}/api/bo/update_annonce/`;
    return this.postRequest(url, params);
  }

  getAnnonceLink(params: any, isFull: boolean = true) {
    const service: any = isFull ? FullAnnonceLink : AnnonceLink
    const linkHelper: FullAnnonceLink|AnnonceLink = new service(params)
    return this.postRequest(linkHelper.url, linkHelper.data, false);
  }

  moderateAnnonce(params) {
    const url = `${environment.SERVER_URL}/api/bo/moderate_ad/`;
    const data = { ad_id: params.id, action: params.etat, token: params.token };
    return this.postRequest(url, data);
  }

  postPromotion(params) {
    const url = `${environment.SERVER_URL}/api/bo/promote/`;
    return this.postRequest(url, params);
  }

  stopPromotion(params) {
    const url = `${environment.SERVER_URL}/api/bo/stop_promoting/`;
    return this.postRequest(url, params);
  }

  cancelPromo(params) {
    const url = `${environment.SERVER_URL}/api/bo/cancel_promo/`;
    return this.postRequest(url, params);
  }

  refreshCache() {
    const url = `${environment.SERVER_URL}/api/bo/bo_refresh_cache/`;
    return this.getRequest(url);
  }

  searchAnnonces(payload, isFullResults: boolean = false) {
    let url = new URL(`${environment.SERVER_URL}/api/bo-annonces/`);

    if (payload.params['user_id']) {
      url.searchParams.set('user_id', payload.params['user_id']);
    }

    if(payload.categorie && payload.categorie !== 'all'){
      url.searchParams.set('categorie',payload.categorie)
    }

    if(payload.statut && payload.statut !== 'all'){
      url.searchParams.set('etat',payload.statut)
    }

    if (payload.keyword) {
      url.searchParams.set('keyword', payload['keyword']);
    }

    if (payload.source && payload.source !== 'all') {
      url.searchParams.set('source', payload['source']);
    }

    // We need to reset pagination params
    url.searchParams.set('page', payload.page || '1')

    if (payload.per_page) {
      url.searchParams.set('per_page', payload.per_page)
    }

    return this
      .getRequest(url.href).pipe(
      map((data: any) => isFullResults ? data : data.results));
  }

  getOneCommonModerationMessage (params) {
    const data = {
      0: "Votre annonce a été rejetée car vous avez déjà une annonce similaire en ligne.",
      1: "Votre annonce a été rejetée car elle ne respecte pas nos règles de diffusion.",
      2: "Votre annonce a été rejetée car les photos ne correspondaient pas au produit ou service décrit.",
      3: "Votre annonce a été rejetée car elle ne disposait pas de photo.\nNous vous invitons à redéposer votre annonce en téléchargeant entre 1 et 3 photos de vos produits.\nNous nous excusons pour la gêne occasionnée.",
      4: "Vous avez posté une annonce, malheureusement il n'y a pas assez d'informations. Nous sommes donc obligés de la supprimer.\nMerci de la republier en ajoutant un titre précis, une photo du produit vendu ou service proposé et un descriptif complet.",
      5: "Votre annonce a dû être rejetée car un logo/numéro de téléphone était visible sur la photo.\nMerci de reposter vos annonces avec de nouvelles photos."
    };

    return "Bonjour,\n" + `${data[params]}` + "\nBonne journée.\nL'équipe CoinAfrique`";
  }

}
