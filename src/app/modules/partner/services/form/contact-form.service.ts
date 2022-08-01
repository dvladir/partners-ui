import { Injectable } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseFormService} from '@dvladir/ng-ui-kit';
import {CONTACT_FIELDS, ContactFormGroup} from './form-types/contact-form';
import {ContactInfoDto} from '../../../api/models/contact-info-dto';
import {ValidationErrorInfoDto} from "../../../api/models/validation-error-info-dto";

@Injectable({
  providedIn: 'root'
})
export class ContactFormService extends BaseFormService<ContactFormGroup, ContactInfoDto>{

  constructor(
    private _fb: FormBuilder
  ) {
    super();
  }

  createForm(value?: ContactInfoDto): ContactFormGroup {
    const result: ContactFormGroup = this._fb.group({
      email: [value?.email || ''],
      phone: [value?.phone || '']
    }) as ContactFormGroup;
    return result;
  }

  setApiErrors(form: ContactFormGroup, errors?: ValidationErrorInfoDto): void {
    if (!errors) {
      return;
    }
    Object.keys(CONTACT_FIELDS).forEach(key => {
      const fieldErrors = errors?.children?.[key]?.errors!;
      this.setApiErrorsToControl(form?.controls[key]!, fieldErrors);
    });
    this.setApiErrorsToControl(form, errors?.errors!);
  }

  extractDto(form: ContactFormGroup): ContactInfoDto{
    return form.value;
  }
}
