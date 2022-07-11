import {Currency} from '../../enum/currency';

export interface RoomReservationPayload {
  checkIn?: Date;
  checkOut?: Date;
  totalPrice?: number;
  currency?: Currency;
  numberOfAdults?: number;
  numberOfChildren?: number;
  specialRequest?: string;
  arrivalTime?: string;
  contactDetailsPayload?: ReservationContactDetailsPayload;
  reservationItemPayloadList?: RoomReservationItemPayload[];
}

export interface ReservationContactDetailsPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  countryId?: string;
}

export interface RoomReservationItemPayload {
  roomId?: string;
  numberOfRooms?: number;
  price?: number;
  currency?: Currency;
  fullGuestName?: string;
  guestEmail?: string;
}

