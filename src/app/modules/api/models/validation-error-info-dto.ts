/* tslint:disable */
/* eslint-disable */
export interface ValidationErrorInfoDto {
  children?: { [key: string]: ValidationErrorInfoDto };
  errors?: Array<string>;
}
