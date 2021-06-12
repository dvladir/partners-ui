import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {InitialLoadPartners} from './modules/partner/store/parnter.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _router: Router,
    private _store: Store
  ) {
  }

  async ngOnInit(): Promise<any> {
    await this._store.dispatch(new InitialLoadPartners()).toPromise();
    this._router.initialNavigation();
  }
}
