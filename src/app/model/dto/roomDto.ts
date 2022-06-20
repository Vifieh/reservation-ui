import {Size} from '../../enum/size';
import {Policy} from '../../enum/policy';
import {Currency} from '../../enum/currency';

export interface RoomDto {
  id?: string;
  name?: string;
  numberOfRooms?: number;
  roomSize?: number;
  unitPrice?: number;
  numberOfGuests?: number;
  size?: Size;
  smokingPolicy?: Policy;
  currency?: Currency;
  roomName?: string,
  roomBedAvailableDtoList?: RoomBedAvailableDto[];
}

export interface RoomBedAvailableDto {
  id?: string;
  bedAvailableId?: string;
  numberOfBeds?: number;
}

