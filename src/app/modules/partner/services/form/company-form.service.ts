import { Injectable } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseFormService} from '@dvladir/ng-ui-kit';
import {COMPANY_FIELDS, CompanyFormGroup} from './form-types/company-form';
import {CompanyInfoDto} from '../../../api/models/company-info-dto';
import {ValidationErrorInfoDto} from "../../../api/models/validation-error-info-dto";

@Injectable({
  providedIn: 'root'
})
export class CompanyFormService extends BaseFormService<CompanyFormGroup, CompanyInfoDto>{

  constructor(
    private _fb: FormBuilder
  ) {
    super()
  }

  createForm(value?: CompanyInfoDto): CompanyFormGroup {
    const result: CompanyFormGroup = this._fb.group({
      foundationYear: [value?.foundationYear || 0],
      name: [value?.name || ''],
      numEmployees: [value?.numEmployees || 0],
    }) as CompanyFormGroup;
    return result;
  }

  setApiErrors(form: CompanyFormGroup, errors?: ValidationErrorInfoDto): void {
    if (!errors) {
      return;
    }
    Object.keys(COMPANY_FIELDS).forEach(key => {
      const fieldErrors = errors?.children?.[key]?.errors;
      this.setApiErrorsToControl(form.controls[key], fieldErrors!);
    });
    this.setApiErrorsToControl(form, errors?.errors!);
  }

  extractDto(form: CompanyFormGroup): CompanyInfoDto {
    return form.value;
  }
}
