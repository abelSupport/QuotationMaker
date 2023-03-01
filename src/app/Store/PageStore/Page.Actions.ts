/* eslint-disable @ngrx/prefer-action-creator */
import {Action} from '@ngrx/store';
export enum PageActionTypes {
  Open_Page = 'OpenPage',
  LogOut_Page = 'LogOut',
  Close_Page = 'ClosePage'
}
export class OpenPage implements Action {
    readonly type = PageActionTypes.Open_Page
    constructor(public payload: any){}
}

export class Logout implements Action {
  readonly type = PageActionTypes.LogOut_Page;
}

export class ClosePage implements Action {
    readonly type = PageActionTypes.Close_Page
    constructor(public payload: any){}
}

export type PageActions = OpenPage | ClosePage
