import {NgModule} from '@angular/core';
import {SearchPipe} from './pipes/search.pipe';
import {NavbarComponent} from '../core/components/nav-bar/navbar.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { DragAndDropDirective } from './directives/drag-and-drop/drag-and-drop.directive';

@NgModule({
  declarations: [
    SearchPipe,
    NavbarComponent,
    DragAndDropDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    SearchPipe,
    NavbarComponent,
    DragAndDropDirective
  ]
})

export class SharedModule {

}
