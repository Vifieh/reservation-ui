import {CustomDto} from './customDto';
import {FileInfoDto} from './fileInfoDto';

export interface PropertyDto {
  id: string;
  name: string;
  rating: number;
  // reviews: number;
  pending: boolean;
  completedRegistration: boolean;
  propertyContactDetailsDto: PropertyContactDetailsDto;
  propertyAddressDto: PropertyAddressDto;
  fileInfoList: FileInfoDto[]
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
  streetAddress: string;
  addressLine2: string;
  code: string;
  cityDto: CustomDto;
}
