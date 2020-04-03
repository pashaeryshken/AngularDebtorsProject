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

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    CoreRoutingModule,
    StoreModule.forRoot(reducerMap),
    EffectsModule.forRoot([UserEffect, DebtorsEffects]),
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
