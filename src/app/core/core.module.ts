import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {LoginModule} from '../features/login-page/login.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CoreRoutingModule} from './core-routing.module';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    CoreRoutingModule,
  ],
  exports: [
    LoginModule,
    MainLayoutComponent
  ],
})
export class CoreModule {}
