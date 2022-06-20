import {Default} from '../../enum/default';
import {Status} from '../../enum/status';

export interface PolicyPayload {
  guestCanCancel?: string;
  guestPay?: string;
  checkInFrom?: string;
  checkInTo?: string;
  checkOutFrom?: string;
  checkOutTo?: string;
  canAccommodateChildren?: Default;
  petPayload?: PetPayload;
}

export interface PetPayload {
  allowPets?: Default;
  charge?: Status;

}
