import {ErrorInfoDto} from '../../../api/models/error-info-dto';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {API_ERRORS} from './form-ext/api-errors';

export abstract class BaseFormService<FORM, DTO> {
  abstract createForm(value?: DTO): FORM;
  abstract setApiErrors(form: FORM, errors?: ErrorInfoDto): void;
  abstract extractDto(form: FORM): DTO;

  protected setApiErrorsToControl(control: AbstractControl, errors: string[]): void {
    if (errors && errors.length > 0) {
      const errorsData: ValidationErrors = {};
      (errorsData as any)[API_ERRORS] = errors;
      control.setErrors(errorsData);
      if (!control.dirty) {
        control.markAsDirty();
      }
    }
  }
}
