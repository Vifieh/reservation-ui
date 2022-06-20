import {CustomDto} from './customDto';

export interface PropertyDto {
  id: string;
  name: string;
  rating: number;
  pending: boolean;
  completedRegistration: boolean;
  propertyContactDetailsDto?: PropertyContactDetailsDto;
  propertyAddressDto?: PropertyAddressDto;
}

export interface PropertyContactDetailsDto {
  id: string;
  name: string;
  phoneNumber: string;
  alternativeNumber: string;
  companyName: string;
}

export interface PropertyAddressDto {
  id: string;
  streetAddress?: string;
  addressLine2?: string;
  code?: string;
  countryDto?: CustomDto;
  cityDto?: CustomDto;
}
