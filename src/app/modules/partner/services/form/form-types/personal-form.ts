import {generateFieldNames, TypedFormConfig, TypedFormGroup} from '@dvladir/ng-ui-kit';
import {PersonalInfoDto} from '../../../../api/models/personal-info-dto';
import {Gender} from './gender.enum';

export class PersonalValue implements PersonalInfoDto {
  birthDate: string = '';
  firstName: string = '';
  gender: Gender = Gender.male;
  lastName: string = '';
  middleName: string = '';
}

export type PersonalFormConfig = TypedFormConfig<PersonalValue>;
export type PersonalFormGroup = TypedFormGroup<PersonalValue>;
export const PERSONAL_FIELDS = generateFieldNames(PersonalValue);
