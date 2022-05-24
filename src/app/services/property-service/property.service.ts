import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseMessage, SuccessResponse} from '../../model/responseMessage';
import {PropertyPayload} from '../../model/payload/property-payload';
import {ParkingPayload} from '../../model/payload/parking-payload';
import {CustomPayload} from '../../model/payload/customPayload';
import {PropertyFacilityPayload} from '../../model/payload/property-facility-payload';
import {BreakfastPayload} from '../../model/payload/breakfast-payload';
import {ExtraBedPayload} from '../../model/payload/extra-bed-payload';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createProperty(propertyTypeId: string, propertyPayload: PropertyPayload): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      `${this.baseUrlPro}/properties/propertyTypes/${propertyTypeId}`,
      propertyPayload
    )
  }

  addParkingFacility(propertyId: string, parkingPayload: ParkingPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/parking/properties/${propertyId}`,
      parkingPayload
    )
  }

  addLanguages(propertyId: string, languagePayload: CustomPayload[]): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/languages/properties/${propertyId}`,
      languagePayload
    )
  }

  addFacilities(propertyId: string, propertyFacilityPayloads: PropertyFacilityPayload[]): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/facilities/properties/${propertyId}`,
      propertyFacilityPayloads
    )
  }

  addBreakfasts(propertyId: string, breakfastPayload: BreakfastPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/breakfasts/properties/${propertyId}`,
      breakfastPayload
    )
  }

  addExtraBedOption(propertyId: string, extraBedPayload: ExtraBedPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/extraBedOptions/properties/${propertyId}`,
      extraBedPayload
    )
  }
}
