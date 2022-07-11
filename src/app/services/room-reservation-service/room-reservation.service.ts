import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseMessage, SuccessResponse} from '../../model/responseMessage';
import {RoomReservationItemPayload, RoomReservationPayload} from '../../model/payload/roomReservationPayload';
import {RoomReservationDto, RoomReservationResponse} from '../../model/dto/roomReservationDto';
import {CustomDto} from '../../model/dto/customDto';

@Injectable({
  providedIn: 'root'
})
export class RoomReservationService {
  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  reserveRoom(propertyId: string | null | undefined, roomReservationPayload: RoomReservationItemPayload): Observable<RoomReservationResponse> {
    return this.http.post<RoomReservationResponse>(
      `${this.baseUrlPro}/roomReservations?propertyId=${propertyId}`,
      roomReservationPayload
    )
  }

  getReservationsByProperty(propertyId: string | null | undefined, hasCheckedOut: boolean): Observable<RoomReservationDto[]> {
    return this.http.get<RoomReservationDto[]>(
      `${this.baseUrlPro}/reservations/properties/${propertyId}?hasCheckedOut=${hasCheckedOut}`
    )
  }

  getReservation(reservationId: string): Observable<RoomReservationResponse> {
    return this.http.get<RoomReservationResponse>(
      `${this.baseUrlPub}/reservations/${reservationId}`
    )
  }

  checkOutGuest(reservationId: string | null | undefined, body?: null): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/roomReservations?reservationId=${reservationId}`,
      body
    );
  }

}
