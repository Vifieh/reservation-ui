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
export class FacilityService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createFacility(facilityPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/facilities`,
      facilityPayload
    )
  }

  editFacility(facilityId: string, facilityPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/facilities/${facilityId}`,
      facilityPayload
    )
  }

  getFacilities(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPub}/facilities`
    )
  }

  getFacility(facilityId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(`${this.baseUrlPub}/facilities/${facilityId}`)

  }

  deleteFacility(facilityId: string): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(
      `${this.baseUrlPro}/facilities/${facilityId}`
    )
  }
}
