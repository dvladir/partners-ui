import {Injectable} from '@angular/core';
import {BaseFormService} from './base-form.service';
import {PERSONAL_FIELDS, PersonalFormGroup} from './form-types/personal-form';
import {PersonalDto} from '../../../api/models/personal-dto';
import {ErrorInfoDto} from '../../../api/models/error-info-dto';
import {FormBuilder} from '@angular/forms';
import {Gender} from './form-types/gender.enum';

@Injectable({
  providedIn: 'root'
})
export class PersonalFormService extends BaseFormService<PersonalFormGroup, PersonalDto>{
  constructor(
    private _fb: FormBuilder
  ) {
    super()
  }

  createForm(value?: PersonalDto): PersonalFormGroup {
    const result: PersonalFormGroup = this._fb.group({
      birthDate: [value?.birthDate || ''],
      firstName: [value?.firstName || ''],
      isMale: [value?.gender === Gender.male || ''],
      lastName: [value?.lastName || ''],
      middleName: [value?.middleName || '']
    }) as PersonalFormGroup;
    return result;
  }

  setApiErrors(form: PersonalFormGroup, errors: ErrorInfoDto): void {
    Object.keys(PERSONAL_FIELDS).forEach(key => {
      const fieldErrors = errors?.children[key]?.errors;
      this.setApiErrorsToControl(form.controls[key], fieldErrors);
    })
    this.setApiErrorsToControl(form, errors?.errors);
  }

  extractDto(form: PersonalFormGroup): PersonalDto {
    const {birthDate, firstName, lastName, middleName, isMale} = form.value;
    const gender = isMale ? Gender.male : Gender.female;
    return {birthDate, firstName, lastName, middleName, gender};
  }

}
