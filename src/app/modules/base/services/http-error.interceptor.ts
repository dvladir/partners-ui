import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, ObservableInput, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ErrorMessageCode} from '../share/error-message-code.enum';
import {ToastService} from '@dvladir/ng-ui-kit';
import {ValidationError} from '../share/validation-error';
import {ErrorResponseDto} from '../../api/models/error-response-dto';
import {ValidationErrorContainerDto} from "../../api/models/validation-error-container-dto";

const PROCEED_CODES: ReadonlyArray<ErrorMessageCode> = [
  ErrorMessageCode.INTERNAL_ERROR,
  ErrorMessageCode.PARTNER_NOT_FOUND,
  ErrorMessageCode.INVALID_PARTNER_TYPE
];

const VIEW = 'SERVER_ERRORS';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private _toasts: ToastService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    return next.handle(req).pipe(
      catchError(err => {

        let errorInfo: ErrorResponseDto | undefined = undefined;
        if (typeof err.error === 'string') {
          try {
            errorInfo = JSON.parse(err.error);
          } catch (e) {
            throw err;
          }
        } else {
          errorInfo = err.error as ErrorResponseDto;
        }

        const code = errorInfo?.code as ErrorMessageCode;
        if (PROCEED_CODES.includes(code!)) {
          this._toasts.errorMessage(code!, VIEW);
        }

        if (code === ErrorMessageCode.VALIDATION_ERROR) {
          const container = (errorInfo!.params as ValidationErrorContainerDto[])[0];
          throw new ValidationError(container.errors!);
        }

        throw err;
      })
    );
  }

}
