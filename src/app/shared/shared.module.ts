import {NgModule} from '@angular/core';
import {SearchPipe} from './pipes/search.pipe';
import {NavbarComponent} from '../core/components/nav-bar/navbar.component';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DragAndDropDirective} from './directives/drag-and-drop/drag-and-drop.directive';
import {CircleDiagramComponent} from '../features/user-info-page/circle-deagram/circle-diagram.component';
import {RemoveBtnDirective} from './directives/remove-btn/remove-btn.directive';
import {ModalComponent} from './components/modal/modal.component';

@NgModule({
  declarations: [
    SearchPipe,
    NavbarComponent,
    DragAndDropDirective,
    CircleDiagramComponent,
    RemoveBtnDirective,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchPipe,
    NavbarComponent,
    DragAndDropDirective,
    CircleDiagramComponent,
    RemoveBtnDirective,
    ModalComponent
  ],
  providers: [DatePipe]
})

export class SharedModule {

}
