import {NgModule} from '@angular/core';
import {UserInfoPageComponent} from './user-info-page.component';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [UserInfoPageComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{
      path: '', component: UserInfoPageComponent
    }])
  ],
  exports: [],
})
export class UserInfoPageModule {
}
