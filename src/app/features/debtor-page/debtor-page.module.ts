import {NgModule} from '@angular/core';
import {DebtorPageComponent} from './debtor-page.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [DebtorPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '', component: DebtorPageComponent
    }])
  ],
  exports: [
  ]
})
export class DebtorPageModule {
}
