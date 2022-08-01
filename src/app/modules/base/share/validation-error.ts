import {ValidationErrorInfoDto} from "../../api/models/validation-error-info-dto";

export class ValidationError {
  constructor(
    public errors: ValidationErrorInfoDto
  ) {
  }
}
