import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {first, map} from 'rxjs/operators';
import {PartnerFormService} from '../../services/form/partner-form.service';
import {PARTNER_FIELDS, PartnerFormGroup} from '../../services/form/form-types/partner-form';
import {PERSONAL_FIELDS} from '../../services/form/form-types/personal-form';
import {COMPANY_FIELDS} from '../../services/form/form-types/company-form';
import {ADDRESS_FIELDS} from '../../services/form/form-types/address-form';
import {CONTACT_FIELDS} from '../../services/form/form-types/contact-form';
import {PartnerType} from '../../services/form/form-types/partner-type.enum';

@Component({
  selector: 'app-partner-editor',
  templateUrl: './partner-editor.component.html',
  styleUrls: ['./partner-editor.component.scss']
})
export class PartnerEditorComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _partnerForm: PartnerFormService
  ) { }

  form?: PartnerFormGroup

  readonly PARTNER_FIELDS: typeof PARTNER_FIELDS = PARTNER_FIELDS;
  readonly PERSONAL_FIELDS: typeof PERSONAL_FIELDS = PERSONAL_FIELDS;
  readonly COMPANY_FIELDS: typeof COMPANY_FIELDS = COMPANY_FIELDS;
  readonly ADDRESS_FIELDS: typeof ADDRESS_FIELDS = ADDRESS_FIELDS;
  readonly CONTACT_FIELDS: typeof CONTACT_FIELDS = CONTACT_FIELDS;

  readonly PartnerType: typeof PartnerType = PartnerType;

  async ngOnInit(): Promise<unknown> {
    const partner = await this._activatedRoute.data.pipe(
      map(x => x.partner),
      first()
    ).toPromise();

    this.form = this._partnerForm.createForm(partner);

    return undefined;
  }

}
