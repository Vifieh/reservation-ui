import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseMessage, SuccessResponse} from '../../model/responseMessage';
import {PropertyPayload} from '../../model/payload/property-payload';
import {CustomPayload} from '../../model/payload/customPayload';
import {ExtraBedPayload} from '../../model/payload/extra-bed-payload';
import {FacilitiesServicesPayload} from '../../model/payload/facilities-services-payload';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createProperty(propertyTypeId?: string | null | undefined, propertyPayload?: PropertyPayload): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(
      `${this.baseUrlPro}/properties/propertyTypes/${propertyTypeId}`,
      propertyPayload
    )
  }

  addFacilitiesAndServices(propertyId?: string | null | undefined, facilitiesServicesPayload?: FacilitiesServicesPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/properties/${propertyId}`,
      facilitiesServicesPayload
    )
  }

  addExtraBedOption(propertyId: string, extraBedPayload: ExtraBedPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/extraBedOptions/properties/${propertyId}`,
      extraBedPayload
    )
  }
}
