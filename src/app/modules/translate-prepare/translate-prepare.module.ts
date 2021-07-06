import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {CustomLoader} from './custom-loader';
import {DEFAULT_VIEW} from '@dvladir/ng-ui-kit';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader
      }
    })
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    {
      provide: DEFAULT_VIEW,
      useValue: 'CAPTIONS'
    },
    {
      provide: APP_INITIALIZER,
      deps: [TranslateService],
      useFactory: (translateService: TranslateService) => {
        return () => {
          return new Promise((resolve => {
            translateService.setDefaultLang('ru');
            translateService.use('ru');
            resolve(undefined);
          }))
        }
      },
      multi: true
    }
  ]
})
export class TranslatePrepareModule { }
