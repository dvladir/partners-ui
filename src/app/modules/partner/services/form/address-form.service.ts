import { Injectable } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AddressDto} from '../../../api/models/address-dto';
import {ADDRESS_FIELDS, AddressFormGroup} from './form-types/address-form';
import {ErrorInfoDto} from '../../../api/models/error-info-dto';
import {BaseFormService} from './base-form.service';

@Injectable({
  providedIn: 'root'
})
export class AddressFormService extends BaseFormService<AddressFormGroup, AddressDto>{

  constructor(
    private _fb: FormBuilder
  ) {
    super()
  }

  createForm(value?: AddressDto): AddressFormGroup {
    const result: AddressFormGroup = this._fb.group({
      city: [value?.city || '', []],
      idx: [value?.idx || '', []],
      houseNumber: [value?.houseNumber || ''],
      street: [value?.street || '']
    }) as AddressFormGroup;
    return result;
  }

  setApiErrors(form: AddressFormGroup, errors: ErrorInfoDto): void {
    Object.keys(ADDRESS_FIELDS).forEach(key => {
      const fieldErrors = errors?.children[key]?.errors;
      this.setApiErrorsToControl(form.controls[key], fieldErrors);
    });
    this.setApiErrorsToControl(form, errors?.errors);
  }

  extractDto(form: AddressFormGroup): AddressDto {
    return form.value;
  }
}
