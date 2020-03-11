import {NgModule} from '@angular/core';
import {DebtorPageComponent} from './debtor-page.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [DebtorPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    DebtorPageComponent
  ]
})
export class DebtorPageModule {}
