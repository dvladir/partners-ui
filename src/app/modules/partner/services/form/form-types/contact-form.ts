import {ContactDto} from '../../../../api/models/contact-dto';
import {generateFieldNames, TypedFormConfig, TypedFormGroup} from '../form-ext/typed-form';

export class ContactValue implements ContactDto {
  email: string = '';
  phone: string = '';
}

export type ContactFormConfig = TypedFormConfig<ContactValue>;
export type ContactFormGroup = TypedFormGroup<ContactValue>;
export const CONTACT_FIELDS = generateFieldNames(ContactValue);
