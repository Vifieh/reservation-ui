import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CustomPayload} from '../../model/payload/customPayload';
import {Observable} from 'rxjs';
import {CustomDto} from '../../model/dto/customDto';
import {ResponseMessage} from '../../model/responseMessage';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createAmenity(categoryId: string, amenityPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/amenities/categoryAmenities/${categoryId}`,
      amenityPayload
    )
  }

  editAmenity(amenityId: string, amenityPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/amenities/${amenityId}`,
      amenityPayload
    )
  }

  getAmenities(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPro}/amenities`
    )
  }

  getAmenitiesByCategory(categoryId?: string): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPro}/amenitiesamenities/categoryAmenities/${categoryId}`
    )
  }

  getAmenity(amenityId?: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(
      `${this.baseUrlPro}/amenities/${amenityId}`
    )
  }

  deleteAmenity(amenityId?: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/amenities/${amenityId}`
    )
  }
}
