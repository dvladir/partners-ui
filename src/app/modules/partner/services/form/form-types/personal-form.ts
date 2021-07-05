import {generateFieldNames, TypedFormConfig, TypedFormGroup} from '@vt/core';
import {PersonalDto} from '../../../../api/models/personal-dto';
import {Gender} from './gender.enum';

export class PersonalValue implements PersonalDto {
  birthDate: string = '';
  firstName: string = '';
  gender: Gender = Gender.male;
  lastName: string = '';
  middleName: string = '';
}

export type PersonalFormConfig = TypedFormConfig<PersonalValue>;
export type PersonalFormGroup = TypedFormGroup<PersonalValue>;
export const PERSONAL_FIELDS = generateFieldNames(PersonalValue);
