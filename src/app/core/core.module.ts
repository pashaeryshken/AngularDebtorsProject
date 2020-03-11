import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {LoginModule} from '../login-page/login.module';
import {HttpClientModule} from '@angular/common/http';
import {MainLayoutModule} from '../shared/components/main-layout/main-layout.module';
import {AppRoutingModule} from '../app-routing.module';
import {DebtorPageModule} from '../debtor-page/debtor-page.module';
import {DebtorsListPageModule} from '../debtors-list-page/debtors-list-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    LoginModule,
    AppRoutingModule,
    MainLayoutModule,
    HttpClientModule,
    DebtorPageModule,
    DebtorsListPageModule
  ],
  exports: [
    LoginModule,
    MainLayoutModule,
    AppRoutingModule,
    DebtorPageModule,
    DebtorsListPageModule
  ],
})
export class CoreModule {}
