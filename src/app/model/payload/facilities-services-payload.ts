import {CustomPayload, DefaultPayload} from './customPayload';
import {Available} from '../../enum/available';
import {Type} from '../../enum/type';
import {Site} from '../../enum/site';
import {Reservation} from '../../enum/reservation';
import {Status} from '../../enum/status';
import {Currency} from '../../enum/currency';

export interface FacilitiesServicesPayload {
  parkingPayload?: ParkingPayload;
  breakfastPayload?: BreakfastPayload;
  languagePayload?: CustomPayload[];
  propertyFacilityPayloadList?: PropertyFacilityPayload[];
}

export interface ParkingPayload {
  available?: Available;
  type?: Type;
  site?: Site;
  reservation?: Reservation;
  unitPrice?: number;
  currency?: Currency;
}

export interface BreakfastPayload {
  unitPrice?: number;
  currency?: Currency;
  available?: Available;
  breakfastAvailablePayload?: DefaultPayload[];
}

export interface PropertyFacilityPayload {
  facilityId?: string;
  status?: Status;
}
