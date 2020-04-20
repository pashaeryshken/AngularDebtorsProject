import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {LoginPageComponent} from '../features/login-page/login-page.component';
import {AuthGuard} from '../services/auth/auth.guard';
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
        path: '', component: NavbarComponent, children: [
          {path: '', redirectTo: '/debtors', pathMatch: 'full'},
          {
            path: 'user-info',
            loadChildren: () => import('../features/user-info-page/user-info-page.module')
              .then(mod => mod.UserInfoPageModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'peoples',
            loadChildren: () => import('../features/people-list-page/people-list-page.module')
              .then(mod => mod.PeopleListPageModule),
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
