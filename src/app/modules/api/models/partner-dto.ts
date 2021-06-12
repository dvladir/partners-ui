/* tslint:disable */
/* eslint-disable */
import { AddressDto } from './address-dto';
import { CompanyDto } from './company-dto';
import { ContactDto } from './contact-dto';
import { PersonalDto } from './personal-dto';
export interface PartnerDto {
  addressInfo: AddressDto;
  companyInfo: CompanyDto;
  contactInfo: ContactDto;
  id: string;
  partnerType: 'naturalPerson' | 'legalEntity';
  personalInfo: PersonalDto;
}
