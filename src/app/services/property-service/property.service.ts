import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseMessage, SuccessResponse} from '../../model/responseMessage';
import {PropertyPayload} from '../../model/payload/property-payload';
import {CustomPayload} from '../../model/payload/customPayload';
import {FacilitiesServicesPayload} from '../../model/payload/facilities-services-payload';
import {PolicyPayload} from '../../model/payload/policyPayload';
import {CustomDto} from '../../model/dto/customDto';
import {PropertyDto} from '../../model/dto/propertyDto';

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
      `${this.baseUrlPro}/facilitiesServices/properties/${propertyId}`,
      facilitiesServicesPayload
    )
  }

  addPaymentOptions(propertyId?: string | null | undefined, paymentOptionsPayload?: CustomPayload[]): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/paymentOptions/properties/${propertyId}`,
      paymentOptionsPayload
    )
  }

  addPolicy(propertyId?: string | null | undefined, policyPayload?: PolicyPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/policies/properties/${propertyId}`,
      policyPayload
    )
  }

  getProperty(propertyId: string | null | undefined): Observable<PropertyDto> {
    return this.http.get<PropertyDto>(
      `${this.baseUrlPub}/properties/${propertyId}`
    )
  }

  getAllProperties(pending: boolean): Observable<PropertyDto[]> {
    return this.http.get<PropertyDto[]>(
      `${this.baseUrlPro}/properties`
    )
  }

  getAllPropertiesOfUser(): Observable<PropertyDto[]> {
    return this.http.get<PropertyDto[]>(
      `${this.baseUrlPro}/properties/users`
    )
  }

  completeRegistration(propertyId?: string | null | undefined, body?: null): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/registration/properties/${propertyId}`,
      body
    )
  }

  // completeRegistration(propertyId?: string): Observable<ResponseMessage> {
  //   return this.http.patch<ResponseMessage>(
  //     `${this.baseUrlPro}/registration/properties/${propertyId}`
  //   )
  // }
}
