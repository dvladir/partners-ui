import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ApiModule} from './modules/api/api.module';
import {NgxsModule} from '@ngxs/store';
import {PartnerState} from './modules/partner/store/partner.state';
import {environment} from '../environments/environment';
import {PartnerModule} from './modules/partner/partner.module';
import {BaseModule} from './modules/base/base.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BaseModule,
    BrowserModule,
    AppRoutingModule,
    ApiModule.forRoot({
      rootUrl: environment.apiUrl
    }),
    NgxsModule.forRoot([
      PartnerState
    ], {
      developmentMode: !environment.production
    }),
    PartnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
