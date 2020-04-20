import {NgModule} from '@angular/core';
import {DebtorsListPageComponent} from './debtors-list-page.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { CardDebtorComponent } from '../../shared/components/card-debtor/card-debtor.component';

@NgModule({
  declarations: [DebtorsListPageComponent, CardDebtorComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([{
            path: '', component: DebtorsListPageComponent
        }]),
        FormsModule
    ],
  exports: [
  ]
})
export class DebtorsListPageModule {}
