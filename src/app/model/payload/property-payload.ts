import {CustomPayload} from './customPayload';

export interface PropertyPayload {
  name?: string;
  rating?: string;
  propertyContactDetailsPayload?: PropertyContactDetailsPayload;
  propertyAddressPayload?: PropertyAddressPayload;
}

export interface PropertyContactDetailsPayload {
  name?: string;
  phoneNumber?: string;
  alternativeNumber?: string;
  companyName?: string;
}

export interface PropertyAddressPayload {
  streetAddress?: string;
  addressLine2?: string;
  code?: string;
  country?: CustomPayload;
  city?: CustomPayload;
}
