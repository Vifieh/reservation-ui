import { Injectable } from '@angular/core';
import {CustomPayload} from '../../model/payload/customPayload';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {CustomDto} from '../../model/dto/customDto';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomNameService {
  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createRoomName(roomTypeId: string, roomNamePayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/roomTypes/roomTypeId=${roomTypeId}`,
      roomNamePayload
    )
  }

  editRoomName(roomNameId: string, roomNamePayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/roomNames/roomNameId=${roomNameId}`,
      roomNamePayload
    )
  }

  getRoomNames(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPub}/roomNames`
    )
  }

  getRoomNamesByRoomType(roomNameId: string): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPub}/roomNames/${roomNameId}`
    )
  }

  getRoomName(roomNameId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(
      `${this.baseUrlPub}/roomNames/${roomNameId}`
    )
  }

  deleteRoomName(roomNameId: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/roomNames/${roomNameId}`
    )
  }
}
