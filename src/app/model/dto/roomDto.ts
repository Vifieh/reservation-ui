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
  roomName?: string;
  roomBedAvailableDtoList?: RoomBedAvailableDto[];
}

export interface RoomBedAvailableDto {
  id?: RoomBedAvailableKey;
  bedAvailableDto?: BedAvailableDto;
  numberOfBeds?: number;
}

export interface BedAvailableDto {
  id?: string;
  name?: string;
}

export interface RoomBedAvailableKey {
  bedAvailableId?: string;
  roomId?: string;
}

