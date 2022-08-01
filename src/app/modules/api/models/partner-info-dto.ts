/* tslint:disable */
/* eslint-disable */
import { AddressDto } from './address-dto';
import { CompanyInfoDto } from './company-info-dto';
import { ContactInfoDto } from './contact-info-dto';
import { PersonalInfoDto } from './personal-info-dto';
export interface PartnerInfoDto {
  addressInfo?: AddressDto;
  companyInfo?: CompanyInfoDto;
  contactInfo?: ContactInfoDto;
  id?: string;
  partnerType?: string;
  personalInfo?: PersonalInfoDto;
}
