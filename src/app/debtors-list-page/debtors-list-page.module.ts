import {NgModule} from '@angular/core';
import {DebtorsListPageComponent} from './debtors-list-page.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [DebtorsListPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    DebtorsListPageComponent
  ]
})
export class DebtorsListPageModule {}
