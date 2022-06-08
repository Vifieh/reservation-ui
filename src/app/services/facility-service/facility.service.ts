import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CustomPayload} from '../../model/payload/customPayload';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {FacilityDto} from '../../model/dto/customDto';

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

  getFacilities(): Observable<FacilityDto[]> {
    return this.http.get<FacilityDto[]>(
      `${this.baseUrlPro}/facilities`
    )
  }

  getFacility(facilityId: string): Observable<FacilityDto> {
    return this.http.get<FacilityDto>(`${this.baseUrlPro}/facilities/${facilityId}`)

  }

  deleteFacility(facilityId: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/facilities/${facilityId}`
    )
  }
}
