import {generateFieldNames, TypedFormConfig, TypedFormGroup} from '@dvladir/ng-ui-kit';
import {AddressFormConfig, AddressFormGroup, AddressValue} from './address-form';
import {CompanyFormConfig, CompanyFormGroup, CompanyValue} from './company-form';
import {ContactFormConfig, ContactFormGroup, ContactValue} from './contact-form';
import {PersonalFormConfig, PersonalFormGroup, PersonalValue} from './personal-form';
import {PartnerType} from './partner-type.enum';

export class PartnerValue {
  addressInfo: AddressValue | undefined = undefined;
  companyInfo: CompanyValue | undefined = undefined;
  contactInfo: ContactValue | undefined = undefined;
  id: string| undefined = undefined;
  partnerType: PartnerType.naturalPerson | PartnerType.legalEntity | undefined = undefined;
  personalInfo: PersonalValue | undefined = undefined;
}

export type PartnerFormConfig = TypedFormConfig<PartnerValue> & {
  addressInfo: AddressFormConfig;
  companyInfo: CompanyFormConfig;
  contactInfo: ContactFormConfig;
  personalInfo: PersonalFormConfig;
};
export type PartnerFormGroup = TypedFormGroup<PartnerValue> & {
  controls: {
    addressInfo: AddressFormGroup;
    companyInfo: CompanyFormGroup;
    contactInfo: ContactFormGroup;
    personalInfo: PersonalFormGroup;
  }
};

export const PARTNER_FIELDS = generateFieldNames(PartnerValue);
