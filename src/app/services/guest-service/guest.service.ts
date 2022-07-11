import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {CustomPayload} from '../../model/payload/customPayload';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {CustomDto} from '../../model/dto/customDto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createGuest(guestPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/guests`,
      guestPayload
    )
  }

  editGuest(guestId: string, guestPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/guests/${guestId}`,
      guestPayload
    )
  }

  getGuests(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPro}/guests`
    )
  }

  getGuest(guestId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(`${this.baseUrlPro}/guests/${guestId}`)

  }

  deleteGuest(guestId: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/guests/${guestId}`
    )
  }
}
