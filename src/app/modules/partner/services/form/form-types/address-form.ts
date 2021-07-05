import {generateFieldNames, TypedFormConfig, TypedFormGroup} from '@vt/core';
import {AddressDto} from '../../../../api/models/address-dto';

export class AddressValue implements AddressDto {
  city: string = '';
  houseNumber: string = '';
  idx: string = '';
  street: string = '';
}

export type AddressFormConfig = TypedFormConfig<AddressValue>;
export type AddressFormGroup = TypedFormGroup<AddressValue>;
export const ADDRESS_FIELDS = generateFieldNames(AddressValue);
