import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DebtorPageComponent} from './debtor-page/debtor-page.component';
import {DebtorsListPageComponent} from './debtors-list-page/debtors-list-page.component';
import {AuthGuard} from './shared/services/auth.guard';
import {SignPageComponent} from './sign-page/sign-page.component';
import {CreateDebtorPageComponent} from './create-debtor-page/create-debtor-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'sign', component: SignPageComponent},
      {path: 'debtors', component: DebtorsListPageComponent,/* canActivate: [AuthGuard]*/},
      {path: 'create', component: CreateDebtorPageComponent},
      {path: 'debtors/:id', component: DebtorPageComponent, canActivate: [AuthGuard]}
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
