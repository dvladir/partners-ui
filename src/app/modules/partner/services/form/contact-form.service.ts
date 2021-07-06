import { Injectable } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseFormService, ErrorInfo} from '@dvladir/ng-ui-kit';
import {CONTACT_FIELDS, ContactFormGroup} from './form-types/contact-form';
import {ContactDto} from '../../../api/models/contact-dto';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService extends BaseFormService<ContactFormGroup, ContactDto>{

  constructor(
    private _fb: FormBuilder
  ) {
    super();
  }

  createForm(value?: ContactDto): ContactFormGroup {
    const result: ContactFormGroup = this._fb.group({
      email: [value?.email || ''],
      phone: [value?.phone || '']
    }) as ContactFormGroup;
    return result;
  }

  setApiErrors(form: ContactFormGroup, errors?: ErrorInfo): void {
    if (!errors) {
      return;
    }
    Object.keys(CONTACT_FIELDS).forEach(key => {
      const fieldErrors = errors?.children[key]?.errors;
      this.setApiErrorsToControl(form?.controls[key], fieldErrors);
    });
    this.setApiErrorsToControl(form, errors?.errors);
  }

  extractDto(form: ContactFormGroup): ContactDto {
    return form.value;
  }
}
