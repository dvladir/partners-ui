import {generateFieldNames, TypedFormConfig, TypedFormGroup} from '../form-ext/typed-form';

export class PersonalValue {
  birthDate: string = '';
  firstName: string = '';
  isMale: boolean = true;
  lastName: string = '';
  middleName: string = '';
}

export type PersonalFormConfig = TypedFormConfig<PersonalValue>;
export type PersonalFormGroup = TypedFormGroup<PersonalValue>;
export const PERSONAL_FIELDS = generateFieldNames(PersonalValue);
