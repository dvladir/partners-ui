import {CompanyDto} from '../../../../api/models/company-dto';
import {generateFieldNames, TypedFormConfig, TypedFormGroup} from '../form-ext/typed-form';

export class CompanyValue implements CompanyDto {
  foundationYear: number = 0;
  name: string = '';
  numEmployees: number = 0;
}

export type CompanyFormConfig = TypedFormConfig<CompanyValue>;
export type CompanyFormGroup = TypedFormGroup<CompanyValue>;
export const COMPANY_FIELDS = generateFieldNames(CompanyValue);
