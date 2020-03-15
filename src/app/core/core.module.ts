import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {LoginModule} from '../login-page/login.module';
import {HttpClientModule} from '@angular/common/http';
import {MainLayoutModule} from '../main-layout/main-layout.module';
import {DebtorPageModule} from '../debtor-page/debtor-page.module';
import {DebtorsListPageModule} from '../debtors-list-page/debtors-list-page.module';
import {SignPageModule} from '../sign-page/sign-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    LoginModule,
    MainLayoutModule,
    HttpClientModule,
    DebtorPageModule,
    DebtorsListPageModule,
    SignPageModule
  ],
  exports: [
    LoginModule,
    MainLayoutModule,
    DebtorPageModule,
    DebtorsListPageModule,
    SignPageModule
  ],
})
export class CoreModule {}
