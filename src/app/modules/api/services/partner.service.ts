/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { IdentifyDto } from '../models/identify-dto';
import { PageDataDto } from '../models/page-data-dto';
import { PartnerDto } from '../models/partner-dto';
import { PartnerHeaderDto } from '../models/partner-header-dto';

@Injectable({
  providedIn: 'root',
})
export class PartnerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation partnerControllerSearch
   */
  static readonly PartnerControllerSearchPath = '/partner/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `partnerControllerSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  partnerControllerSearch$Response(params?: {
    query?: string;
    pageNum?: number;
    pageSize?: number;
    sort?: string;
  }): Observable<StrictHttpResponse<{ 'data'?: Array<PartnerHeaderDto> } & PageDataDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartnerService.PartnerControllerSearchPath, 'get');
    if (params) {
      rb.query('query', params.query, {});
      rb.query('pageNum', params.pageNum, {});
      rb.query('pageSize', params.pageSize, {});
      rb.query('sort', params.sort, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'data'?: Array<PartnerHeaderDto> } & PageDataDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `partnerControllerSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  partnerControllerSearch(params?: {
    query?: string;
    pageNum?: number;
    pageSize?: number;
    sort?: string;
  }): Observable<{ 'data'?: Array<PartnerHeaderDto> } & PageDataDto> {

    return this.partnerControllerSearch$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'data'?: Array<PartnerHeaderDto> } & PageDataDto>) => r.body as { 'data'?: Array<PartnerHeaderDto> } & PageDataDto)
    );
  }

  /**
   * Path part for operation partnerControllerGetPartner
   */
  static readonly PartnerControllerGetPartnerPath = '/partner/{partnerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `partnerControllerGetPartner()` instead.
   *
   * This method doesn't expect any request body.
   */
  partnerControllerGetPartner$Response(params: {
    partnerId: string;
  }): Observable<StrictHttpResponse<PartnerDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartnerService.PartnerControllerGetPartnerPath, 'get');
    if (params) {
      rb.path('partnerId', params.partnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PartnerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `partnerControllerGetPartner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  partnerControllerGetPartner(params: {
    partnerId: string;
  }): Observable<PartnerDto> {

    return this.partnerControllerGetPartner$Response(params).pipe(
      map((r: StrictHttpResponse<PartnerDto>) => r.body as PartnerDto)
    );
  }

  /**
   * Path part for operation partnerControllerUpdatePartner
   */
  static readonly PartnerControllerUpdatePartnerPath = '/partner/{partnerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `partnerControllerUpdatePartner()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  partnerControllerUpdatePartner$Response(params: {
    partnerId: string;
    body: PartnerDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PartnerService.PartnerControllerUpdatePartnerPath, 'put');
    if (params) {
      rb.path('partnerId', params.partnerId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `partnerControllerUpdatePartner$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  partnerControllerUpdatePartner(params: {
    partnerId: string;
    body: PartnerDto
  }): Observable<void> {

    return this.partnerControllerUpdatePartner$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation partnerControllerRemovePartner
   */
  static readonly PartnerControllerRemovePartnerPath = '/partner/{partnerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `partnerControllerRemovePartner()` instead.
   *
   * This method doesn't expect any request body.
   */
  partnerControllerRemovePartner$Response(params: {
    partnerId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PartnerService.PartnerControllerRemovePartnerPath, 'delete');
    if (params) {
      rb.path('partnerId', params.partnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `partnerControllerRemovePartner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  partnerControllerRemovePartner(params: {
    partnerId: string;
  }): Observable<void> {

    return this.partnerControllerRemovePartner$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation partnerControllerAddPartner
   */
  static readonly PartnerControllerAddPartnerPath = '/partner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `partnerControllerAddPartner()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  partnerControllerAddPartner$Response(params: {
    body: PartnerDto
  }): Observable<StrictHttpResponse<IdentifyDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartnerService.PartnerControllerAddPartnerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IdentifyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `partnerControllerAddPartner$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  partnerControllerAddPartner(params: {
    body: PartnerDto
  }): Observable<IdentifyDto> {

    return this.partnerControllerAddPartner$Response(params).pipe(
      map((r: StrictHttpResponse<IdentifyDto>) => r.body as IdentifyDto)
    );
  }

}
