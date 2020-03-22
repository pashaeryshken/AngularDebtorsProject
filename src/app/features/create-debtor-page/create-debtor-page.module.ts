import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CreateDebtorPageComponent} from './create-debtor-page.component';

@NgModule({
  declarations: [CreateDebtorPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '', component: CreateDebtorPageComponent
    }])
  ],
  exports: [
  ],
  providers:[DatePipe]
})
export class CreateDebtorPageModule {}
