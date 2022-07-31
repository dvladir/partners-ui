import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, first, takeUntil} from 'rxjs/operators';
import {PartnerFormService} from '../../services/form/partner-form.service';
import {PARTNER_FIELDS, PartnerFormGroup} from '../../services/form/form-types/partner-form';
import {PERSONAL_FIELDS} from '../../services/form/form-types/personal-form';
import {COMPANY_FIELDS} from '../../services/form/form-types/company-form';
import {ADDRESS_FIELDS} from '../../services/form/form-types/address-form';
import {CONTACT_FIELDS} from '../../services/form/form-types/contact-form';
import {PartnerType} from '../../services/form/form-types/partner-type.enum';
import {Observable, Subject} from 'rxjs';
import {NavigationService} from '../../../base/services/navigation.service';
import {PartnerInfoDto} from '../../../api/models/partner-info-dto';
import {Select, Store} from '@ngxs/store';
import {PartnerState} from '../../store/partner.state';
import {ClearPartnerData, SavePartner} from '../../store/parnter.actions';
import {ModalService, PhoneMaskItem} from '@dvladir/ng-ui-kit';
import {ValidationErrorInfoDto} from "../../../api/models/validation-error-info-dto";

@Component({
  selector: 'app-partner-editor',
  templateUrl: './partner-editor.component.html',
  styleUrls: ['./partner-editor.component.scss']
})
export class PartnerEditorComponent implements OnInit, OnDestroy {

  constructor(
    private _partnerForm: PartnerFormService,
    private _nav: NavigationService,
    private _store: Store,
    private _modal: ModalService
  ) {
  }

  @Select(PartnerState.editablePartner) partnerDto$?: Observable<PartnerInfoDto>;
  @Select(PartnerState.partnerValidationErrors) validationErrors?: Observable<ValidationErrorInfoDto>;

  private _terminator$: Subject<unknown> = new Subject<unknown>();

  form?: PartnerFormGroup

  hasChanged: boolean = false;

  readonly PHONE_MASK: string = '{+7} 000 000-00-00';
  readonly PHONE_MASKS: PhoneMaskItem[] = [
    {code: '+7', mask: '(000) 000-00-00'},
    {code: '+1', mask: '000 000-00-00'},
    {code: '+49', mask: '(0000) 000-0000'},
  ];

  readonly numEmplRange: { min: number, max: number } = {min: 1, max: 9999};

  readonly PARTNER_FIELDS: typeof PARTNER_FIELDS = PARTNER_FIELDS;
  readonly PERSONAL_FIELDS: typeof PERSONAL_FIELDS = PERSONAL_FIELDS;
  readonly COMPANY_FIELDS: typeof COMPANY_FIELDS = COMPANY_FIELDS;
  readonly ADDRESS_FIELDS: typeof ADDRESS_FIELDS = ADDRESS_FIELDS;
  readonly CONTACT_FIELDS: typeof CONTACT_FIELDS = CONTACT_FIELDS;

  readonly PartnerType: typeof PartnerType = PartnerType;

  private showIncorrectFieldsMessage(): void {
    const message = 'partner_invalid_fields';
    const view = 'MESSAGES';
    this._modal.openMessage({ message, view });
  }

  async ngOnInit(): Promise<unknown> {
    const partner = await this.partnerDto$!.pipe(
      first()
    ).toPromise();

    this.form = this._partnerForm.createForm(partner);

    this.form.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this._terminator$)
      )
      .subscribe(() => {
        this.hasChanged = true;
      });

    this.validationErrors!
      .pipe(takeUntil(this._terminator$))
      .subscribe(errors => {
        if (errors) {
          this._partnerForm.setApiErrors(this.form!, errors);
          this.showIncorrectFieldsMessage();
        }
      });

    return undefined;
  }

  async cancel(): Promise<any> {
    await this._store.dispatch(new ClearPartnerData()).toPromise();
    this._nav.openPartnerList();
  }

  async save(): Promise<unknown> {
    if (!this.form!.valid) {
      this.showIncorrectFieldsMessage();
      return undefined;
    }
    const dto: PartnerInfoDto = this._partnerForm.extractDto(this.form!);
    const st = await this._store.dispatch(new SavePartner(dto)).toPromise();
    if (st.partners.savePartnerSucceed) {
      this.hasChanged = false;
      this.cancel();
    }
    return undefined;
  }

  ngOnDestroy(): void {
    this._terminator$.next();
    this._terminator$.complete();
  }

}
