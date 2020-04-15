import {NgModule} from '@angular/core';
import {SearchDebtorsPipe} from './pipes/search-debtors.pipe';
import {NavbarComponent} from '../core/components/nav-bar/navbar.component';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DragAndDropDirective} from './directives/drag-and-drop/drag-and-drop.directive';
import {CircleDiagramComponent} from '../features/user-info-page/circle-deagram/circle-diagram.component';
import {RemoveBtnDirective} from './directives/remove-btn/remove-btn.directive';
import {ModalComponent} from './components/modal/modal.component';
import {RemoveBtnDebtorComponent} from './components/remove-btn-debtor/remove-btn-debtor.component';
import {DropdownPeopleListComponent} from './components/modal/dropdown-people-list/dropdown-people-list.component';
import {CreatePeopleFormComponent} from './components/modal/create-people-form/create-people-form.component';
import {PeopleCardComponent} from './components/people-card/people-card.component';
import {PhoneMaskDirective} from './directives/phone-mask/phone-mask.directive';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    SearchDebtorsPipe,
    NavbarComponent,
    DragAndDropDirective,
    CircleDiagramComponent,
    RemoveBtnDirective,
    ModalComponent,
    RemoveBtnDebtorComponent,
    DropdownPeopleListComponent,
    CreatePeopleFormComponent,
    PeopleCardComponent,
    PhoneMaskDirective,
    EditBtnComponent,
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
    NavbarComponent,
    DragAndDropDirective,
    CircleDiagramComponent,
    RemoveBtnDirective,
    ModalComponent,
    RemoveBtnDebtorComponent,
    PeopleCardComponent,
    EditBtnComponent
  ],
  providers: [DatePipe]
})

export class SharedModule {

}
