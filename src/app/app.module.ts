import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiModule} from './modules/api/api.module';
import {NgxsModule} from '@ngxs/store';
import {PartnerState} from './modules/partner/store/partner.state';
import {environment} from '../environments/environment';
import {PartnerModule} from './modules/partner/partner.module';
import {BaseModule} from './modules/base/base.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpErrorInterceptor} from './modules/base/services/http-error.interceptor';
import {NoCacheInterceptor} from './modules/base/services/no-cache.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {DEFAULT_ERROR_VIEW} from '@dvladir/ng-ui-kit';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApiModule.forRoot({
      rootUrl: environment.apiUrl
    }),
    NgxsModule.forRoot([
      PartnerState
    ], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
    PartnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NoCacheInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }, {
    provide: DEFAULT_ERROR_VIEW,
    useValue: 'VALIDATION_ERRORS'
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
