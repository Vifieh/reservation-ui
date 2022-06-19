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
export class BreakfastAvailableService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createBreakfastAvailable(breakfastAvailablePayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/breakfastAvailable`,
      breakfastAvailablePayload
    )
  }

  editBreakfastAvailable(breakfastAvailableId: string, breakfastAvailablePayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/breakfastAvailable/${breakfastAvailableId}`,
      breakfastAvailablePayload
    )
  }

  getAllBreakfastAvailable(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPro}/breakfastsAvailable`
    )
  }

  getBreakfastAvailable(breakfastAvailableId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(
      `${this.baseUrlPro}/breakfastAvailable/${breakfastAvailableId}`
    )
  }

  deleteBreakfastAvailable(breakfastAvailableId: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/breakfastAvailable/${breakfastAvailableId}`
    )
  }
}
