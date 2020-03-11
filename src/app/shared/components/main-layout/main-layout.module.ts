import {NgModule} from '@angular/core';
import {MainLayoutComponent} from './main-layout.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared.module';
import {AppRoutingModule} from '../../../app-routing.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MainLayoutComponent
  ],
})
export class MainLayoutModule {}
