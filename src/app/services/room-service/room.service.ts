import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RoomPayload} from '../../model/payload/room-payload';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {RoomAmenityPayload} from '../../model/payload/room-amenity-payload';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createRoom(propertyId: string, roomNameId: string, roomPayload: RoomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/rooms`,
      roomPayload
    )
  }

  addRoomAmenities(roomAmenityPayloadList: RoomAmenityPayload[]): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/roomAmenities`,
      roomAmenityPayloadList
    )
  }
}
