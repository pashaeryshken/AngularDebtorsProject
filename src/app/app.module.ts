import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {CoreRoutingModule} from './core/core-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CoreRoutingModule
  ],
  exports: [
    CoreRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
