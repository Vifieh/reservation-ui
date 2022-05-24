import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {HttpClient} from '@angular/common/http';
import {PropertyTypePayload} from '../../model/payload/property-type-payload';
import {PropertyTypeDto} from '../../model/dto/property-type-dto';

@Injectable({
  providedIn: 'root'
})
export class PropertyTypeService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createPropertyType(propertyTypePayload: PropertyTypePayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/propertyTypes`,
      propertyTypePayload
    )
  }

  editPropertyType(propertyTypeId: string, propertyTypePayload: PropertyTypePayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/propertyTypes/${propertyTypeId}`,
      propertyTypePayload
    )
  }

  getPropertyTypes(): Observable<PropertyTypeDto[]> {
    return this.http.get<PropertyTypeDto[]>(
      `${this.baseUrlPub}/propertyTypes`
    )
  }

  getPropertyType(propertyTypeId: string): Observable<PropertyTypeDto> {
    return this.http.get<PropertyTypeDto>(`${this.baseUrlPub}/propertyTypes/${propertyTypeId}`)

  }

  deletePropertyType(propertyTypeId: string): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(
      `${this.baseUrlPro}/propertyTypes/${propertyTypeId}`
    )
  }
}
