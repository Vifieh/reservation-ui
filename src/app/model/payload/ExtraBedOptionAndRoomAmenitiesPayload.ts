import {DefaultPayload} from './customPayload';
import {Currency} from '../../enum/currency';

export interface  ExtraBedOptionAndRoomAmenitiesPayload{
  extraBedPayload?: ExtraBedPayload;
  roomAmenityPayloadList?: RoomAmenityPayload[];
}

export interface ExtraBedPayload {
  numberOfExtraBeds?: number;
  guestExtraBedPayloadList?: GuestExtraBedPayload[];
}

export interface GuestExtraBedPayload {
  guestId?: string;
  range?: string;
  currency?: Currency;
  unitPrice?: number;
}

export interface RoomAmenityPayload {
  amenityId?: string;
  rooms?: DefaultPayload[];
}


