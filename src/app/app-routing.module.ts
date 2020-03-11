import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DebtorPageComponent} from './debtor-page/debtor-page.component';
import {DebtorsListPageComponent} from './debtors-list-page/debtors-list-page.component';
import {AuthGuard} from './shared/services/auth.guard';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'debtors', component: DebtorsListPageComponent, canActivate: [AuthGuard]},
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
