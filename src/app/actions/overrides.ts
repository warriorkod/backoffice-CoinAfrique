import { Action as DefaultAction } from "@ngrx/store";

export interface Action extends DefaultAction {
    payload?: any;
}
