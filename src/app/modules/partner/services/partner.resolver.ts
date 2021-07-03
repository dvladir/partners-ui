import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PartnerDto} from '../../api/models/partner-dto';
import {PartnerService} from '../../api/services/partner.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerResolver implements Resolve<PartnerDto | undefined> {

  constructor(
    private _api: PartnerService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PartnerDto | undefined> | Promise<PartnerDto | undefined> | PartnerDto | undefined {
    const partnerId: string = route.params['id'];
    if (partnerId === 'new') {
      return undefined;
    }
    return this._api.partnerControllerGetPartner({partnerId});
  }

}
