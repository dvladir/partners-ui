import {generateFieldNames, TypedFormConfig, TypedFormGroup} from '@dvladir/ng-ui-kit';
import {ContactInfoDto} from '../../../../api/models/contact-info-dto';

export class ContactValue implements ContactInfoDto {
  email: string = '';
  phone: string = '';
}

export type ContactFormConfig = TypedFormConfig<ContactValue>;
export type ContactFormGroup = TypedFormGroup<ContactValue>;
export const CONTACT_FIELDS = generateFieldNames(ContactValue);
