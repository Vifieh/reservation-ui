import {BaseEntity} from '../base-entity';

export interface UserPayload {
  email?: string;
  contactDetailsPayload?: ContactDetailsPayload;
}

export interface ContactDetailsPayload{
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}
