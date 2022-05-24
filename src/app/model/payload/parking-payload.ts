import {Available} from '../../enum/available';
import {Type} from '../../enum/type';
import {Site} from '../../enum/site';
import {Reservation} from '../../enum/reservation';

export interface ParkingPayload {
  available?: Available;
  type?: Type;
  site?: Site;
  reservation?: Reservation;
  unitPrice?: number;
}
