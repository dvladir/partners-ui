import { Injectable } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseFormService} from '@dvladir/ng-ui-kit';
import {PARTNER_FIELDS, PartnerFormGroup} from './form-types/partner-form';
import {PartnerInfoDto} from '../../../api/models/partner-info-dto';
import {AddressFormService} from './address-form.service';
import {ContactFormService} from './contact-form.service';
import {PersonalFormService} from './personal-form.service';
import {CompanyFormService} from './company-form.service';
import {PartnerType} from './form-types/partner-type.enum';
import {ValidationErrorInfoDto} from "../../../api/models/validation-error-info-dto";

@Injectable({
  providedIn: 'root'
})
export class PartnerFormService extends BaseFormService<PartnerFormGroup, PartnerInfoDto>{
  constructor(
    private _fb: FormBuilder,
    private _addressForm: AddressFormService,
    private _contactForm: ContactFormService,
    private _personalForm: PersonalFormService,
    private _companyForm: CompanyFormService
  ) {
    super();
  }

  createForm(value?: PartnerInfoDto): PartnerFormGroup {
    const result: PartnerFormGroup = this._fb.group({
      id: [value?.id || ''],
      partnerType: [value?.partnerType || undefined],
      addressInfo: this._addressForm.createForm(value?.addressInfo),
      contactInfo: this._contactForm.createForm(value?.contactInfo),
      personalInfo: this._personalForm.createForm(value?.personalInfo),
      companyInfo: this._companyForm.createForm(value?.companyInfo)
    }) as PartnerFormGroup;
    return result;
  }

  setApiErrors(form: PartnerFormGroup, errors?: ValidationErrorInfoDto): void {
    if (!errors) {
      return;
    }
    this.setApiErrorsToControl(form.controls.partnerType, errors?.children?.[PARTNER_FIELDS.partnerType!]?.errors!);
    this._addressForm.setApiErrors(form.controls.addressInfo, errors?.children?.[PARTNER_FIELDS.addressInfo!]);
    this._contactForm.setApiErrors(form.controls.contactInfo, errors?.children?.[PARTNER_FIELDS.contactInfo!]);
    this._personalForm.setApiErrors(form.controls.personalInfo, errors?.children?.[PARTNER_FIELDS.personalInfo!]);
    this._companyForm.setApiErrors(form.controls.companyInfo, errors?.children?.[PARTNER_FIELDS.companyInfo!]);
    this.setApiErrorsToControl(form, errors?.errors!);
  }

  extractDto(form: PartnerFormGroup): PartnerInfoDto {
    const {id, partnerType} = form.value;
    const addressInfo = this._addressForm.extractDto(form.controls.addressInfo);
    const contactInfo = this._contactForm.extractDto(form.controls.contactInfo);
    const personalInfo = this._personalForm.extractDto(form.controls.personalInfo);
    const companyInfo = this._companyForm.extractDto(form.controls.companyInfo);

    const commonData: Pick<PartnerInfoDto, 'addressInfo' | 'contactInfo' | 'id' | 'partnerType'> = {
      id, partnerType, addressInfo, contactInfo
    };

    const result: PartnerInfoDto = partnerType === PartnerType.legalEntity ? {
      ...commonData,
      companyInfo
    } as PartnerInfoDto : {
      ...commonData,
      personalInfo
    } as PartnerInfoDto;

    return result;
  }

}
