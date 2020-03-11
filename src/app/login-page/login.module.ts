import {NgModule} from '@angular/core';
import {LoginPageComponent} from './login-page.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthGuard} from '../shared/services/auth.guard';
import {AuthServices} from '../shared/services/auth.services';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginPageComponent
  ],
  providers: [AuthGuard, AuthServices]
})
export class LoginModule {
}
