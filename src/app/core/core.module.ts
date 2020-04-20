import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {LoginModule} from '../features/login-page/login.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CoreRoutingModule} from './core-routing.module';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserEffect} from './store/effects/user.effect';
import {reducerMap} from './store/state/app.state';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DebtorsEffects} from './store/effects/debtors.effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PeopleEffects} from './store/effects/people.effects';
import {DebtEffect} from './store/effects/debt.effect';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    CoreRoutingModule,
    StoreModule.forRoot(reducerMap),
    EffectsModule.forRoot([UserEffect, DebtorsEffects, PeopleEffects, DebtEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  exports: [
    LoginModule,
    MainLayoutComponent
  ],
})
export class CoreModule {}
