import { map, switchMap, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { toPayload } from './utils'
import { Action } from '../actions/overrides';

import { BannersService } from "../services/banners.service"
import * as bannersConstants from "../constants/banner"
import * as bannerActions from "../actions/banners"
import * as modalActions from "../actions/modal";

@Injectable()
export class BannersEffects {
  @Effect()
  requestBannersList$: Observable<Action> = this._actions$
    .pipe(
      ofType(bannersConstants.REQUEST_BANNERS_LIST),
      map(toPayload),
      switchMap((queryParams: string) => {
        return this._apisService
          .getList(queryParams)
          .pipe(
            map((data: any) => new bannerActions.RequestBannersListComplete(data)),
            catchError((error: any) => of(new bannerActions.RequestBannersListError(error)))
          )
      })
    )

  @Effect()
  requestBanner$: Observable<Action> = this._actions$
    .pipe(
      ofType(bannersConstants.REQUEST_BANNER),
      map(toPayload),
      switchMap((params: any) => {
        return this._apisService
          .getShow(params.id)
          .pipe(
            map((data: any) => new bannerActions.RequestBannerComplete(data)),
            catchError((error: any) => of(new bannerActions.RequestBannerError(error)))
          )
      })
    )

  @Effect()
  requestCreateBanner$: Observable<Action> = this._actions$
    .pipe(
      ofType(bannersConstants.REQUEST_BANNER_CREATE),
      map(toPayload),
      switchMap((params: any) => {
        return this._apisService
          .postCreate(params)
          .pipe(
            map((data: any) => new bannerActions.RequestBannerCreateComplete(data)),
            catchError((error: any) => of(new bannerActions.RequestBannerCreateError(error)))
          )
      })
    )

  @Effect()
  requestCreateBannerComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(bannersConstants.REQUEST_BANNER_CREATE_COMPLETE),
      map(() => {
        return new modalActions.hideModal({id: "banners-modal"})
      }
    )
  )

  @Effect()
  requestUploadBannerComplete$: Observable<Action> = this._actions$
    .pipe(
      ofType(bannersConstants.REQUEST_BANNER_UPDATE_COMPLETE),
      map(() => {
        return new modalActions.hideModal({id: "banners-modal"})
      }
    )
  )

  @Effect()
  requestUpdateBanner$: Observable<Action> = this._actions$
    .pipe(
      ofType(bannersConstants.REQUEST_BANNER_UPDATE),
      map(toPayload),
      switchMap((params: any) => {
        return this._apisService
          .putEdit(params.bannerId, params.banner)
          .pipe(
            map((data: any) => new bannerActions.RequestBannerUpdateComplete(data)),
            catchError((error: any) => of(new bannerActions.RequestBannerUpdateError(error)))
          )
      })
    )

  @Effect()
  requestGetPresigned$: Observable<Action> = this._actions$
    .pipe(
      ofType(bannersConstants.REQUEST_BANNER_PRESIGNED),
      map(toPayload),
      switchMap((params: any) => {
        return this._apisService
          .getPreSignedUrl(params)
          .pipe(
            map((data: any) => new bannerActions.RequestBannerPresignedComplete(data)),
            catchError((error: any) => of(new bannerActions.RequestBannerPresignedError(error)))
          )
      })
    )

  @Effect()
  requestBannerDelete$: Observable<Action> = this._actions$
    .pipe(
      ofType(bannersConstants.REQUEST_BANNER_DELETE),
      map(toPayload),
      switchMap((params: any) => {
        return this._apisService
          .delete(params.id)
          .pipe(
            map((data: any) => new bannerActions.RequestBannerDeleteComplete({ id: params.id })),
            catchError((error: any) => of(new bannerActions.RequestBannerDeleteError(error)))
          )
      })
    )

  // TODO: use it inside of banner-form.component
  @Effect()
  requestBannerUploadImage$: Observable<Action> = this._actions$
    .pipe(
      ofType(bannersConstants.REQUEST_BANNER_UPLOAD),
      map(toPayload),
      switchMap((params: any) => {
        return this._apisService
          .upload(params.bannerId, params)
          .pipe(
            map((data: any) => new bannerActions.RequestBannerUploadComplete(data)),
            catchError((error: any) => of(new bannerActions.RequestBannerUploadError(error)))
          )
      })
    )


  constructor(
    private _actions$: Actions,
    private _apisService: BannersService
  ) { }
}
