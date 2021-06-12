/* tslint:disable */
/* eslint-disable */
export interface ErrorInfoDto {
  children: { [key: string]: ErrorInfoDto };
  errors: Array<string>;
}
