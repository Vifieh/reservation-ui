import {Size} from '../../enum/size';
import {Policy} from '../../enum/policy';
import {Currency} from '../../enum/currency';

export interface RoomPayload {
  name?: string;
  numberOfRooms?: number;
  roomSize?: number;
  unitPrice?: number;
  numberOfGuests?: number;
  size?: Size;
  smokingPolicy?: Policy;
  currency?: Currency;
  roomNameId?: string,
  roomBedAvailablePayloadList?: RoomBedAvailablePayload[];
}

export interface RoomBedAvailablePayload {
  bedAvailableId?: string;
  numberOfBeds?: number;
}

