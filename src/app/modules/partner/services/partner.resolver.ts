import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {GetPartner} from '../store/parnter.actions';
import {NavigationService} from '../../base/services/navigation.service';
import {ToastService} from '@vt/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerResolver implements Resolve<any> {

  constructor(
    private _store: Store,
    private _nav: NavigationService,
    private _toast: ToastService
  ) {
  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    let partnerId: string | undefined = route.params['id'];
    partnerId = partnerId === 'new' ? undefined : partnerId;
    const st = await this._store.dispatch(new GetPartner(partnerId)).toPromise();
    if (!st.partners.getPartnerSucceed) {
      this._nav.openPartnerList();
      return false;
    }
    this._toast.removeAll();
    return true;
  }

}
