import {Currency} from '../../enum/currency';
import {CustomDto} from './customDto';

export interface RoomReservationDto {
  id: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  currency: Currency;
  numberOfAdults: number;
  numberOfChildren: number;
  specialRequest: string;
  arrivalTime: string;
  ref: string;
  contactDetailsDto: ReservationContactDetailsDto;
  reservationItemDtoList: RoomReservationItemDto[];
}

export interface ReservationContactDetailsDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryDto: CustomDto;
}

export interface RoomReservationItemDto {
  id: string;
  numberOfRooms: number;
  price: number;
  currency: Currency;
  fullGuestName: string;
  guestEmail: string;
  roomDto: CustomDto;
}

export interface RoomReservationResponse {
  id: string;
  totalPrice: number;
  ref: string;
}
