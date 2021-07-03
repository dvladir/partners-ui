import { Injectable } from '@angular/core';
import {BaseFormService} from './base-form.service';
import {COMPANY_FIELDS, CompanyFormGroup} from './form-types/company-form';
import {CompanyDto} from '../../../api/models/company-dto';
import {FormBuilder} from '@angular/forms';
import {ErrorInfoDto} from '../../../api/models/error-info-dto';

@Injectable({
  providedIn: 'root'
})
export class CompanyFormService extends BaseFormService<CompanyFormGroup, CompanyDto>{

  constructor(
    private _fb: FormBuilder
  ) {
    super()
  }

  createForm(value?: CompanyDto): CompanyFormGroup {
    const result: CompanyFormGroup = this._fb.group({
      foundationYear: [value?.foundationYear || 0],
      name: [value?.name || ''],
      numEmployees: [value?.numEmployees || 0],
    }) as CompanyFormGroup;
    return result;
  }

  setApiErrors(form: CompanyFormGroup, errors: ErrorInfoDto): void {
    Object.keys(COMPANY_FIELDS).forEach(key => {
      const fieldErrors = errors?.children[key]?.errors;
      this.setApiErrorsToControl(form.controls[key], fieldErrors);
    });
    this.setApiErrorsToControl(form, errors?.errors);
  }

  extractDto(form: CompanyFormGroup): CompanyDto {
    return form.value;
  }
}
