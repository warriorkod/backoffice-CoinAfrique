import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as modalConstants from '../constants/modal';
import * as modalActions from '../actions/modal';

import { toPayload } from './utils';

declare const jQuery: any;

interface IHtmlElementId {
    id: string
}

@Injectable()
export class ModalEffects {
    @Effect()
    showModal$: Observable<modalActions.modalStateChangeFinished> = this._actions$
        .pipe(
            ofType(modalConstants.SHOW_MODAL),
            map(toPayload),
            map((data: IHtmlElementId) => {
                jQuery(`#${data.id}`).modal('show')
                return new modalActions.modalStateChangeFinished()
            })
        )

    @Effect()
    hideModal$: Observable<modalActions.modalStateChangeFinished> = this._actions$
        .pipe(
            ofType(modalConstants.HIDE_MODAL),
            map(toPayload),
            map((data: IHtmlElementId) => {
                jQuery(`#${data.id}`).modal('hide')
                return new modalActions.modalStateChangeFinished()
            })
        )

    constructor(private _actions$: Actions) {}
}
