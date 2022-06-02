import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CustomPayload} from '../../model/payload/customPayload';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {CustomDto} from '../../model/dto/customDto';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createRoomType(roomTypePayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/roomTypes`,
      roomTypePayload
    )
  }

  editRoomType(roomTypeId: string, roomTypePayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/roomTypes/${roomTypeId}`,
      roomTypePayload
    )
  }

  getRoomTypes(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPub}/roomTypes`
    )
  }

  getRoomType(roomTypeId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(`${this.baseUrlPub}/roomTypes/${roomTypeId}`)

  }

  deleteRoomType(roomTypeId: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/roomTypes/${roomTypeId}`
    )
  }
}
