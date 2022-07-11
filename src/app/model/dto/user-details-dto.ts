import {BaseEntity} from '../base-entity';
import {Role} from '../../enum/role';

export interface UserDetailsDto extends BaseEntity{
  id?: string;
  email?: string;
  contactDetailsDto?: ContactDetailsDto;
  role?: Role[];
}

export interface ContactDetailsDto extends BaseEntity{
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}
