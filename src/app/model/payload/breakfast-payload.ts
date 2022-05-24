import {Available} from '../../enum/available';
import {DefaultPayload} from './room-amenity-payload';

export interface BreakfastPayload {
  unitPrice?: number;
  available?: Available;
  breakfastAvailablePayload?: DefaultPayload[];
}
