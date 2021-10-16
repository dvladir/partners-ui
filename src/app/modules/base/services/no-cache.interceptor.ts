import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NoCacheInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      request.method.toLowerCase() !== 'get' ||
      request.params.has('nocache')
    ) {
      return next.handle(request);
    }

    const params = request.params.append('nocache',  (new Date).getTime());
    const result = request.clone({ params });

    return next.handle(result);
  }
}
