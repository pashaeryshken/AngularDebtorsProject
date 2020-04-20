import {NgModule} from '@angular/core';
import {SearchDebtorsPipe} from './pipes/search-debtors.pipe';
import {NavbarComponent} from '../core/components/nav-bar/navbar.component';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DragAndDropDirective} from './directives/drag-and-drop/drag-and-drop.directive';
import {CircleDiagramComponent} from '../features/user-info-page/circle-deagram/circle-diagram.component';
import {RemoveBtnDirective} from './directives/remove-btn/remove-btn.directive';
import {RemoveBtnComponent} from './components/button-components/remove-btn/remove-btn.component';
import {DropdownPeopleListComponent} from './components/dropdown-people-list/dropdown-people-list.component';
import {CreatePeopleFormComponent} from './components/form-components/create-people-form/create-people-form.component';
import {CardPeopleComponent} from './components/card-people/card-people.component';
import {PhoneMaskDirective} from './directives/phone-mask/phone-mask.directive';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {EditBtnComponent} from './components/button-components/edit-btn/edit-btn.component';
import {CreateDebtorFormComponent} from './components/form-components/create-debtor-form/create-debtor-form.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {SearchPeoplePipe} from './pipes/search-people.pipe';
import {PopupCreateDebtorComponent} from './components/popup-components/popup-create-debtor/popup-create-debtor.component';
import {ExpiredDateDirective} from './directives/expired-date/expired-date.directive';
import { TableHistoryDebtComponent } from './components/table-history-debt/table-history-debt.component';
import { PopupHistoryDeptComponent } from './components/popup-components/popup-history-dept/popup-history-dept.component';
import { PopupCreatePeopleComponent } from './components/popup-components/popup-create-people/popup-create-people.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    SearchDebtorsPipe,
    SearchPeoplePipe,
    NavbarComponent,
    DragAndDropDirective,
    CircleDiagramComponent,
    RemoveBtnDirective,
    PopupCreateDebtorComponent,
    RemoveBtnComponent,
    DropdownPeopleListComponent,
    ExpiredDateDirective,
    CreatePeopleFormComponent,
    CardPeopleComponent,
    PhoneMaskDirective,
    EditBtnComponent,
    CreateDebtorFormComponent,
    SpinnerComponent,
    TableHistoryDebtComponent,
    PopupHistoryDeptComponent,
    PopupCreatePeopleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options)
  ],
    exports: [
        SearchDebtorsPipe,
        SearchPeoplePipe,
        NavbarComponent,
        DragAndDropDirective,
        CircleDiagramComponent,
        RemoveBtnDirective,
        ExpiredDateDirective,
        PopupCreateDebtorComponent,
        RemoveBtnComponent,
        CardPeopleComponent,
        EditBtnComponent,
        SpinnerComponent,
        TableHistoryDebtComponent
    ],
  providers: [DatePipe]
})

export class SharedModule {

}
