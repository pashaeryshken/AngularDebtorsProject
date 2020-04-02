import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {LoginPageComponent} from '../features/login-page/login-page.component';
import {AuthGuard} from '../services/auth.guard';
import {NavbarComponent} from './components/nav-bar/navbar.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/debtors', pathMatch: 'full'},
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'sign',
        loadChildren: () => import('../features/sign-page/sign-page.module').then(mod => mod.SignPageModule)
      },
      {
        path: 'debtors/create',
        loadChildren: () => import('../features/create-debtor-page/create-debtor-page.module')
          .then(mod => mod.CreateDebtorPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '', component: NavbarComponent, children: [
          {path: '', redirectTo: '/debtors', pathMatch: 'full'},
          {
            path: 'user-info',
            loadChildren: () => import('../features/user-info-page/user-info-page.module')
              .then(mod => mod.UserInfoPageModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'debtors',
            loadChildren: () => import('../features/debtors-list-page/debtors-list-page.module')
              .then(mod => mod.DebtorsListPageModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'debtors/:id',
            loadChildren: () => import('../features/debtor-page/debtor-page.module')
              .then(mod => mod.DebtorPageModule),
            canActivate: [AuthGuard]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
