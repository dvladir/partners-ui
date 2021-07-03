import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private _router: Router
  ) { }

  openPartnerList(): void {
    this._router.navigateByUrl('/partners/list');
  }

  editPartner(id: string): void {
    this._router.navigateByUrl(`/partners/edit/${id}`);
  }

  createPartner(): void {
    this._router.navigateByUrl(`/partners/edit/new`);
  }
}
