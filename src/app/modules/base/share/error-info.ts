import {ErrorMessageCode} from './error-message-code.enum';

export interface ErrorInfo {
  code: ErrorMessageCode;
  params?: unknown;
}
