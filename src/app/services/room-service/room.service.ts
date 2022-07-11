import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RoomPayload} from '../../model/payload/room-payload';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {RoomDto} from '../../model/dto/roomDto';
import {ExtraBedOptionAndRoomAmenitiesPayload} from '../../model/payload/ExtraBedOptionAndRoomAmenitiesPayload';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createRoom(propertyId?: string | null | undefined, roomPayload?: RoomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/rooms?propertyId=${propertyId}`,
      roomPayload
    )
  }

  getRoomsOfUserByProperty(propertyId?: string | null | undefined): Observable<RoomDto[]> {
      return this.http.get<RoomDto[]>(
        `${this.baseUrlPro}/rooms?propertyId=${propertyId}`
      )
  }

  getRoomsByProperty(propertyId?: string | null | undefined): Observable<RoomDto[]> {
      return this.http.get<RoomDto[]>(
        `${this.baseUrlPub}/rooms?propertyId=${propertyId}`
      )
  }

    addExtraOptionAndRoomAmenities(propertyId?: string | null | undefined, bedOptionAndRoomAmenitiesPayload?: ExtraBedOptionAndRoomAmenitiesPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/rooms/properties/${propertyId}`,
      bedOptionAndRoomAmenitiesPayload
    )
  }
}
