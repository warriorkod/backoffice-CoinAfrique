import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { Action } from '../actions/overrides';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { UUID } from 'angular2-uuid';

declare const jQuery: any;
import swal from 'sweetalert';
import * as sessionConstants from '../constants/sessions';
import * as annoncesConstants from '../constants/annonces';
import * as annoncesRfuConstants from '../constants/annoncesrfu';
import * as exportsConstants from '../constants/export';
import * as dashboardConstants from '../constants/dashboard';
import * as collectionsConstants from '../constants/collections';
import * as vendeursConstants from '../constants/vendeurs';
import * as vendeursRfuConstants from '../constants/vendeursrfu';
import * as authConstants from '../constants/auth';
import * as moderateursConstants from '../constants/moderateurs';
import * as freelancersConstants from '../constants/freelancers';
import * as notificationsActions from '../actions/notifications';
import * as annoncesActions from '../actions/annonces';
import * as fromRoot from '../reducers';
import * as routerActions from '../actions/router';
import { copyMessage } from '../utils';

@Injectable()
export class NotificationsEffects {
  @Effect()
  oauthError$: Observable<Action> = this._actions$
    .pipe(
      ofType(sessionConstants.REQUEST_OAUTH_ERROR),
      map((params: any) => {
        const text =
          params['payload'].error == 1
            ? params['payload'].message
            : 'Erreur authentification.';

        jQuery.notify(
          {
            message: text
          },
          {
            type: 'danger-solid',
            placement: {
              from: 'top',
              align: 'center'
            }
          }
        );

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'danger',
          title: 'Erreur d\'authentification. :-(',
          text: text
        });
    }));
 g
  @Effect()
  updateAnnonceComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_UPDATE_ANNONCE_COMPLETE),
      map((data) => {
        jQuery('.add-contact-form-modal').modal('hide');
        jQuery.notify(
          {
            message: data['payload']['message']
          },
          {
            type: 'success-solid'
          }
        );

        return new annoncesActions.RequestGetAnnoncesEtatStats();
    }));

  @Effect()
  getAnnoncesComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_ANNONCES_COMPLETE),
      map((data: any) => {
        window.scrollTo(0, 0);
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès',
          text: 'list loaded!'
        });
    }));

  @Effect()
  getAnnonceComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_GET_ANNONCE_COMPLETE),
      map(() => {
        jQuery('.add-contact-form-modal').modal({
          backdrop: 'static',
          keyboard: false  // to prevent closing with Esc button (if you want this too)
        });

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
    }));

  @Effect()
  getAnnonceError$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_GET_ANNONCE_ERROR),
      map(() => {
        const errorMessage: string = `Cette annonce est actuellement en cours de modération.
        <br>
        Elle sera disponible en édition, une fois la modération terminée.
        `

        jQuery.notify(
          {
            message: errorMessage
          },
          {
            type: 'danger-solid',
            placement: {
              from: 'top',
              align: 'center'
            }
          }
        );

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'error',
          title: 'Erreur :-(',
          text: errorMessage
        });
    }))

  @Effect()
  getAnnoncePremiumComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_GET_ANNONCE_PREMIUM_COMPLETE),
      map(() => {
        jQuery('.bd-promote-form').modal('show');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
    }));

  @Effect()
  createPremiumComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_PROMOTION_COMPLETE),
      map(data => {
        jQuery('.bd-promote-form').modal('hide');
        swal(data['payload']['message']);
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
    }));

  @Effect()
  moderateAnnonceComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_MODERATE_ANNONCE_COMPLETE),
      map(() => {
        jQuery('.add-contact-form-modal').modal('hide');
        jQuery.notify(
          {
            message: 'Votre annonce a été modéré avec succés'
          },
          {
            type: 'success-solid'
          }
        );
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
    }));

  @Effect()
  newModerateur$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_NEW_MODERATEUR),
      map(() => {
        console.log('new one');
        jQuery('.add-moderateur-form-modal').modal('show');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'new moderateur'
        });
    }));

  @Effect()
  editAnnonceComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_EDIT_ANNONCE_COMPLETE),
      map(() => {
        jQuery.notify(
          {
            message: 'Votre annonce a été modifié avec succés'
          },
          {
            type: 'success-solid'
          }
        );

        this._store.dispatch(new routerActions.Go({path: ['/annonces']}))

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
    }));

  @Effect()
  updateLinkAnnonceComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_LINK_ANNONCE_COMPLETE),
      map((params: any) => {
        jQuery('.add-contact-form-modal').modal('hide');
        swal(`Le lien a été généré et copié dans votre presse-papier avec succès! \n ${params.payload.shortLink}`);
        copyMessage(params['payload'].shortLink)
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
    }));

  @Effect()
  createAnnonceCollectionComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_CREATE_ANNONCE_COLLECTION_COMPLETE),
      map((params: any) => {
        jQuery('.add-contact-form-modal').modal('hide');
        swal(params['payload'].message);

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
      }));

  @Effect()
  oauthSuccess$: Observable<Action> = this._actions$
    .pipe(
      ofType(sessionConstants.REQUEST_OAUTH_COMPLETE),
      map((data) => {
        if(localStorage.getItem('bo::role') == 'freelancer')
          this._store.dispatch(new routerActions.Go({path: ['/freelancers']}));
        else this._store.dispatch(new routerActions.Go({path: ['/app']}));

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Vous êtes maintenant connecté.'
        });
      }));

  @Effect()
  getCollectionComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(collectionsConstants.REQUEST_COLLECTION_COMPLETE),
      map(() => {
        jQuery('.bd-modal-detail').modal('show');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
      }));

  @Effect()
  createCollectionComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(collectionsConstants.REQUEST_COLLECTION_CREATE_COMPLETE),
      map((params: any) => {
        jQuery('.bd-example-modal-horizontal-form').modal('hide');
        swal(params['payload'].message);

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
      }));

  @Effect()
  deleteCollectionComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(collectionsConstants.REQUEST_COLLECTION_DELETE_COMPLETE),
      map((params: any) => {
        swal('Collection supprimé!');

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
      }));

  @Effect()
  updateCollectionComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(collectionsConstants.REQUEST_COLLECTION_UPDATE_COMPLETE),
      map((params: any) => {
        jQuery('.bd-modal-edit-form').modal('hide');
        swal(params['payload'].message);

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
      }));

  @Effect()
  updateVendeurComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(vendeursConstants.REQUEST_VENDEUR_UPDATE_COMPLETE),
      map((params: any) => {
        jQuery('#edit-vendeur-form-modal').modal('hide');
        swal('Vendeur modifié avec succés!');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Vendeur modifié avec succés!'
        });
      }));

  @Effect()
  updateVendeurError$: Observable<Action> = this._actions$
    .pipe(
      ofType(vendeursConstants.REQUEST_VENDEUR_UPDATE_ERROR),
      map((params: any) => {
        jQuery('#edit-vendeur-form-modal').modal('hide');
        swal('Erreur lors de la sauvegarde!');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'error',
          title: 'Erreur :-)',
          text: 'Erreur lors de la sauvegarde!'
        });
      }));

  @Effect()
  refreshCacheComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(annoncesConstants.REQUEST_ANNONCE_REFRESH_CACHE_COMPLETE),
      map((params: any) => {
        console.log('Cache rafraichi avec succés!');
        swal('Cache rafraichi avec succés!');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succes :-)',
          text: 'Cache rafraichi avec succés!!'
        });
      }));


  @Effect()
  sendNotifComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(exportsConstants.REQUEST_SEND_NOTIF_COMPLETE),
      map((params: any) => {
        jQuery('#bd-modal-send-push').modal('hide');
        swal('Notification envoyé');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succes :-)',
          text: 'Notification envoyé!!'
        });
      }));

  @Effect()
  sendReportComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(exportsConstants.REQUEST_SEND_REPORT_COMPLETE),
      map((params: any) => {
        jQuery('#bd-modal-export-report').modal('hide');
        swal('Rapport envoyé par mail');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succes :-)',
          text: 'Notification envoyé!!'
        });
      }));

  @Effect()
  getKeywordComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(dashboardConstants.REQUEST_CHART_KEYWORD_COMPLETE),
      map((params: any) => {
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succes :-)',
          text: 'Notification envoyé!!'
        });
      }));

  @Effect()
  getModerateurComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_COMPLETE),
      map(() => {
        jQuery('.add-moderateur-form-modal').modal('show');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
      }));

  @Effect()
  getFreelancerComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(freelancersConstants.REQUEST_FREELANCER_COMPLETE),
      map(() => {
        jQuery('.add-moderateur-form-modal').modal('show');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Votre annonce a été modifié avec succés!'
        });
      }));

  @Effect()
  updateModerateurComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_UPDATE_COMPLETE),
      map((params: any) => {
        jQuery('.add-moderateur-form-modal').modal('hide');
        swal('Mise a jour effectuée avec succés!');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Vendeur modifié avec succés!'
        });
      }));

  @Effect()
  createModerateurComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_CREATE_COMPLETE),
      map((params: any) => {
        jQuery('.add-moderateur-form-modal').modal('hide');
        swal('Création effectuée avec succés!');
        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Vendeur modifié avec succés!'
        });
      }));

  @Effect()
  updateProfileComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_PROFILE_UPDATE_COMPLETE),
      map((params: any) => {
        swal('Mise a jour effectuée avec succés!');

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Vendeur modifié avec succés!'
        });
      }));

  @Effect()
  updateProfilePasswordComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_PASSWORD_COMPLETE),
      map((params: any) => {
        swal('Mot de passe changé avec succés!');

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Vendeur modifié avec succés!'
        });
      }));

  @Effect()
  updateProfilePasswordError$: Observable<Action> = this._actions$
    .pipe(
      ofType(moderateursConstants.REQUEST_MODERATEUR_PASSWORD_ERROR),
      map((params: any) => {
        swal('Erreur lors de la modification du mot de passe verifiez votre saisie!');

        return new notificationsActions.NotifyUser({
          uuid: UUID.UUID(),
          type: 'success',
          title: 'Succès :-)',
          text: 'Erreur modification mot de passe!'
        });
    }));

    @Effect()
    updateVendeurRfuComplete$: Observable<Action> = this._actions$
      .pipe(
        ofType(vendeursRfuConstants.REQUEST_VENDEUR_RFU_UPDATE_COMPLETE),
        map((params: any) => {
          swal('Mise a jour effectuée avec succés!');
  
          return new notificationsActions.NotifyUser({
            uuid: UUID.UUID(),
            type: 'success',
            title: 'Succès :-)',
            text: 'Vendeur modifié avec succés!'
          });
        }));

        
        @Effect()
        createVendeurRfuComplete$: Observable<Action> = this._actions$
          .pipe(
            ofType(vendeursRfuConstants.REQUEST_VENDEUR_RFU_CREATE_COMPLETE),
            map((params: any) => {
              swal('Création effectuée avec succés!');
              return new notificationsActions.NotifyUser({
                uuid: UUID.UUID(),
                type: 'success',
                title: 'Succès :-)',
                text: 'Vendeur créé avec succés!'
              });
            }));

            @Effect()
            updateVendeurRfuError$: Observable<Action> = this._actions$
              .pipe(
                ofType(vendeursRfuConstants.REQUEST_VENDEUR_RFU_UPDATE_ERROR),
                map((params: any) => {
                  swal('Erreur lors de la sauvegarde!');
                  return new notificationsActions.NotifyUser({
                    uuid: UUID.UUID(),
                    type: 'error',
                    title: 'Erreur :-)',
                    text: 'Erreur lors de la sauvegarde!'
                  });
                }));
                @Effect()
                createVendeurRfuError$: Observable<Action> = this._actions$
                  .pipe(
                    ofType(vendeursRfuConstants.REQUEST_VENDEUR_RFU_CREATE_ERROR),
                    map((params: any) => {
                      swal('Erreur lors de la création !');
                      return new notificationsActions.NotifyUser({
                        uuid: UUID.UUID(),
                        type: 'error',
                        title: 'Erreur :-)',
                        text: 'Erreur lors de la réation!'
                      });
                    }));
                  @Effect()
                  makeSync$: Observable<Action> = this._actions$
                    .pipe(
                      ofType(authConstants.REQUEST_MAKE_SYNC_COMPLETE),
                      map((params: any) => {
                        swal('Synchronisation effectuée avec succés!');
                        return new notificationsActions.NotifyUser({
                          uuid: UUID.UUID(),
                          type: 'Suuccess',
                          title: 'Succès :-)',
                          text: 'Synchronisation effectuée avec succés!'
                        });
                      }));
                      @Effect()
                      makeSyncError$: Observable<Action> = this._actions$
                        .pipe(
                          ofType(authConstants.REQUEST_MAKE_SYNC_ERROR),
                          map((params: any) => {
                            swal('Erreur lors de la synchronisation !');
                            return new notificationsActions.NotifyUser({
                              uuid: UUID.UUID(),
                              type: 'error',
                              title: 'Erreur :-)',
                              text: 'Erreur lors de la synchronisation!'
                            });
                          }));

                          @Effect()
                          annonceRfuLock$: Observable<Action> = this._actions$
                            .pipe(
                              ofType(annoncesRfuConstants.REQUEST_GET_ANNONCERFU),
                              map(() => {
                                jQuery('.add-contact-form-modal').modal({
                                  backdrop: 'static',
                                  keyboard: false  // to prevent closing with Esc button (if you want this too)
                                });
                                return new notificationsActions.NotifyUser({
                                  uuid: UUID.UUID(),
                                  type: 'success',
                                  title: 'Succès :-)',
                                  text: 'Votre annonce est en cours de modification!'
                                });
                              }));
  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>
  ) { }
}
