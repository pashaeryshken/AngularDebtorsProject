import {NgModule, OnInit} from '@angular/core';
import {DebtorPageComponent} from './debtor-page.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {DebtorsService} from '../../services/debtors.service';

@NgModule({
  declarations: [DebtorPageComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([{
            path: '', component: DebtorPageComponent
        }]),
        FormsModule
    ],
  exports: []
})
export class DebtorPageModule {

}
