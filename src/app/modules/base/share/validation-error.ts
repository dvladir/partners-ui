import {ErrorInfoDto} from '../../api/models/error-info-dto';

export class ValidationError {
  constructor(
    public errors: ErrorInfoDto
  ) {
  }
}
