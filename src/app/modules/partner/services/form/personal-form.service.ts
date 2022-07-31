import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseFormService} from '@dvladir/ng-ui-kit';
import {PERSONAL_FIELDS, PersonalFormGroup} from './form-types/personal-form';
import {PersonalInfoDto} from '../../../api/models/personal-info-dto';
import {ValidationErrorInfoDto} from "../../../api/models/validation-error-info-dto";

@Injectable({
  providedIn: 'root'
})
export class PersonalFormService extends BaseFormService<PersonalFormGroup, PersonalInfoDto>{
  constructor(
    private _fb: FormBuilder
  ) {
    super()
  }

  createForm(value?: PersonalInfoDto): PersonalFormGroup {
    const result: PersonalFormGroup = this._fb.group({
      birthDate: [value?.birthDate || ''],
      firstName: [value?.firstName || ''],
      gender: [value?.gender || undefined],
      lastName: [value?.lastName || ''],
      middleName: [value?.middleName || '']
    }) as PersonalFormGroup;
    return result;
  }

  setApiErrors(form: PersonalFormGroup, errors?: ValidationErrorInfoDto): void {
    if (!errors) {
      return;
    }
    Object.keys(PERSONAL_FIELDS).forEach(key => {
      const fieldErrors = errors?.children?.[key]?.errors;
      this.setApiErrorsToControl(form.controls[key], fieldErrors!);
    })
    this.setApiErrorsToControl(form, errors?.errors!);
  }

  extractDto(form: PersonalFormGroup): PersonalInfoDto{
    return form.value;
  }

}
