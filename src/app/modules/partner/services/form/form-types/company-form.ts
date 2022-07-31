import {generateFieldNames, TypedFormConfig, TypedFormGroup} from '@dvladir/ng-ui-kit';
import {CompanyInfoDto} from '../../../../api/models/company-info-dto';

export class CompanyValue implements CompanyInfoDto {
  foundationYear: number = 0;
  name: string = '';
  numEmployees: number = 0;
}

export type CompanyFormConfig = TypedFormConfig<CompanyValue>;
export type CompanyFormGroup = TypedFormGroup<CompanyValue>;
export const COMPANY_FIELDS = generateFieldNames(CompanyValue);
