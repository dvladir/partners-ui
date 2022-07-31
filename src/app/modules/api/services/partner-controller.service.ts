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
import { PageDataDtoPartnerHeaderDto } from '../models/page-data-dto-partner-header-dto';
import { PartnerInfoDto } from '../models/partner-info-dto';

@Injectable({
  providedIn: 'root',
})
export class PartnerControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPartner
   */
  static readonly GetPartnerPath = '/partner/{partnerId}';

  /**
   * Get partner by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPartner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPartner$Response(params: {
    partnerId: string;
  }): Observable<StrictHttpResponse<PartnerInfoDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartnerControllerService.GetPartnerPath, 'get');
    if (params) {
      rb.path('partnerId', params.partnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PartnerInfoDto>;
      })
    );
  }

  /**
   * Get partner by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPartner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPartner(params: {
    partnerId: string;
  }): Observable<PartnerInfoDto> {

    return this.getPartner$Response(params).pipe(
      map((r: StrictHttpResponse<PartnerInfoDto>) => r.body as PartnerInfoDto)
    );
  }

  /**
   * Path part for operation updatePartner
   */
  static readonly UpdatePartnerPath = '/partner/{partnerId}';

  /**
   * Update partner
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePartner()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePartner$Response(params: {
    partnerId: string;
    body: PartnerInfoDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PartnerControllerService.UpdatePartnerPath, 'put');
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
   * Update partner
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePartner$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePartner(params: {
    partnerId: string;
    body: PartnerInfoDto
  }): Observable<void> {

    return this.updatePartner$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removePartner
   */
  static readonly RemovePartnerPath = '/partner/{partnerId}';

  /**
   * Remove partner
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removePartner()` instead.
   *
   * This method doesn't expect any request body.
   */
  removePartner$Response(params: {
    partnerId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PartnerControllerService.RemovePartnerPath, 'delete');
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
   * Remove partner
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removePartner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removePartner(params: {
    partnerId: string;
  }): Observable<void> {

    return this.removePartner$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation createPartner
   */
  static readonly CreatePartnerPath = '/partner';

  /**
   * Create partner
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPartner()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPartner$Response(params: {
    body: PartnerInfoDto
  }): Observable<StrictHttpResponse<IdentifyDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartnerControllerService.CreatePartnerPath, 'post');
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
   * Create partner
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPartner$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPartner(params: {
    body: PartnerInfoDto
  }): Observable<IdentifyDto> {

    return this.createPartner$Response(params).pipe(
      map((r: StrictHttpResponse<IdentifyDto>) => r.body as IdentifyDto)
    );
  }

  /**
   * Path part for operation search
   */
  static readonly SearchPath = '/partner/search';

  /**
   * Search partners.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search()` instead.
   *
   * This method doesn't expect any request body.
   */
  search$Response(params?: {
    query?: string;
    pageNum?: number;
    pageSize?: number;
    sort?: string;
  }): Observable<StrictHttpResponse<PageDataDtoPartnerHeaderDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartnerControllerService.SearchPath, 'get');
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
        return r as StrictHttpResponse<PageDataDtoPartnerHeaderDto>;
      })
    );
  }

  /**
   * Search partners.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search(params?: {
    query?: string;
    pageNum?: number;
    pageSize?: number;
    sort?: string;
  }): Observable<PageDataDtoPartnerHeaderDto> {

    return this.search$Response(params).pipe(
      map((r: StrictHttpResponse<PageDataDtoPartnerHeaderDto>) => r.body as PageDataDtoPartnerHeaderDto)
    );
  }

}
