import {NgModule} from '@angular/core';
import {SignPageComponent} from './sign-page.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SignPageComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [],
})
export class SignPageModule {
}
