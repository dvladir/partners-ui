import { Component } from '@angular/core';
import {TranslationHelperService} from '@dvladir/ng-ui-kit';

@Component({
  selector: 'app-tns-switch',
  templateUrl: './tns-switch.component.html'
})
export class TnsSwitchComponent {

  constructor(
    private _tnsHelper: TranslationHelperService
  ) {
  }

  get lang(): string {
    return this._tnsHelper.currentLang();
  }

  set lang(value: string) {
    if (value === this.lang) {
      return;
    }
    this._tnsHelper.changeLang(value);
  }

  readonly availableLanguages: string[] = ['en', 'ru'];

}
