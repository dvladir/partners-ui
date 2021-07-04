import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {Store} from '@ngxs/store';
import {PartnerHeaderDto} from '../../../api/models/partner-header-dto';
import {NavigationService} from '../../../base/services/navigation.service';
import {ModalService} from '@vt/core';
import {DeletePartner} from '../../store/parnter.actions';

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

  isOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent): void {
    const t = event.target as HTMLElement;
    const check = 'invoke-button';
    if (t.classList.contains(check) || t.parentElement!.classList.contains(check)) {
      return;
    }
    this.isOpen = false;
  }

  open(): void {
    this.isOpen = false;
    if (this.partnerHeader) {
      this._nav.editPartner(this.partnerHeader.id);
    }
  }

  async remove(): Promise<unknown> {
    this.isOpen = false;
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
