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
export class BedAvailableService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createBedAvailable(bedAvailablePayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/bedsAvailable`,
      bedAvailablePayload
    )
  }

  editBedAvailable(bedAvailableId: string, bedAvailablePayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/bedsAvailable/${bedAvailableId}`,
      bedAvailablePayload
    )
  }

  getBedsAvailable(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPro}/bedsAvailable`
    )
  }

  getBedAvailable(bedAvailableId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(`${this.baseUrlPro}/bedsAvailable/${bedAvailableId}`)

  }

  deleteBedAvailable(bedAvailableId: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/bedsAvailable/${bedAvailableId}`
    )
  }
}

