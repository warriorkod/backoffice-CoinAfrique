import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';

import {AuthRoutingModule} from './auth-routing.module';


import {SignInComponent} from './containers/sign-in/sign-in.component';
import {SignInFormComponent} from './components/sign-in-form/sign-in-form.component';

@NgModule({
  declarations: [
    SignInFormComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,

    SharedModule,
  ]
})
export class AuthModule {
}
