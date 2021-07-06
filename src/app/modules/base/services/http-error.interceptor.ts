import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ErrorMessageCode} from '../share/error-message-code.enum';
import {ToastService} from '@dvladir/ng-ui-kit';
import {ErrorInfo} from '../share/error-info';
import {ValidationError} from '../share/validation-error';
import {ErrorInfoDto} from '../../api/models/error-info-dto';

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
    return next.handle(req).pipe(
      catchError(err => {

        let errorInfo: ErrorInfo | undefined = undefined;
        if (typeof err.error === 'string') {
          try {
            errorInfo = JSON.parse(err.error);
          } catch (e) {
            throw err;
          }
        } else {
          errorInfo = err.error as ErrorInfo;
        }

        const code = errorInfo?.code;
        if (PROCEED_CODES.includes(code!)) {
          this._toasts.errorMessage(code!, VIEW);
        }

        if (code === ErrorMessageCode.VALIDATION_ERROR) {
          throw new ValidationError((errorInfo!.params as any)!.errors as ErrorInfoDto);
        }

        throw err;
      })
    );
  }

}
