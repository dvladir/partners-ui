import {Component, ElementRef, Input} from '@angular/core';
import {Store} from '@ngxs/store';
import {PartnerHeaderDto} from '../../../api/models/partner-header-dto';
import {NavigationService} from '../../../base/services/navigation.service';
import {ModalService, DvMessage} from '@dvladir/ng-ui-kit';
import {DeletePartner} from '../../store/parnter.actions';

const VIEW = 'BUTTONS';

@Component({
  selector: 'app-partner-list-action',
  templateUrl: './partner-list-action.component.html',
  styleUrls: ['./partner-list-action.component.scss']
})
export class PartnerListActionComponent {

  constructor(
    private _elRef: ElementRef,
    private _nav: NavigationService,
    private _modal: ModalService,
    private _store: Store
  ) {
  }

  @Input() partnerHeader?: PartnerHeaderDto;

  readonly actions: ReadonlyArray<{ key: string, label: DvMessage }> = ['open', 'delete'].map(key => {
    const view = VIEW;
    const message = key;
    return {key, label: {message, view}}
  });

  onActionChoose(action: string): void {
    switch (action) {
      case 'open':
        this.open();
        break;
      case 'delete':
        this.remove();
        break;
      default:
        break;
    }
  }

  open(): void {
    if (this.partnerHeader) {
      this._nav.editPartner(this.partnerHeader.id);
    }
  }

  async remove(): Promise<unknown> {
    if (!this.partnerHeader) {
      return undefined;
    }
    const message = 'partner_remove';
    const view = 'MESSAGES';
    const isOk = await this._modal.openConfirm({message, view});
    if (isOk) {
      this._store.dispatch(new DeletePartner(this.partnerHeader.id));
    }
    return undefined;

  }

}
