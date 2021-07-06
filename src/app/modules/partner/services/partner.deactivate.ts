import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {PartnerEditorComponent} from '../components/partner-editor/partner-editor.component';
import {Injectable} from '@angular/core';
import {ModalService} from '@dvladir/ng-ui-kit';

@Injectable({
  providedIn: 'root'
})
export class PartnerDeactivate implements CanDeactivate<PartnerEditorComponent> {

  constructor(
    private _modalService: ModalService
  ) {
  }

  async canDeactivate(
    component: PartnerEditorComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):  Promise<boolean | UrlTree> {

    const view = 'MESSAGES';
    const message = 'partner_unsaved_changes';

    if (component.hasChanged) {
      const isOk = await this._modalService.openConfirm({message, view});
      if (!isOk) {
        return false;
      }
    }

    return true;
  }

}
