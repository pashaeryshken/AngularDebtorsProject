import {NgModule} from '@angular/core';
import {SignPageComponent} from './sign-page.component';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SignPageComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([{
      path: '', component: SignPageComponent
    }])
  ],
  exports: [],
})
export class SignPageModule {
}
