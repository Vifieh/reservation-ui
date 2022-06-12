import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RoomPayload} from '../../model/payload/room-payload';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {RoomAmenityPayload} from '../../model/payload/room-amenity-payload';
import {FormGroup} from '@angular/forms';

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

  addRoomAmenities(roomAmenityPayloadList: RoomAmenityPayload[]): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/roomAmenities`,
      roomAmenityPayloadList
    )
  }
}
