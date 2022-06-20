import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseMessage} from 'src/app/model/responseMessage';
import {CustomPayload} from "../../model/payload/customPayload";
import {CustomDto} from "../../model/dto/customDto";
import {PropertyAddressDto} from '../../model/dto/propertyDto';
import {CityDto} from '../../model/dto/cityDto';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) {
  }

  createCity(countryId: string, cityPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/cities/countries/${countryId}`,
      cityPayload
    )
  }

  editCity(cityId: string, cityPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/cities/${cityId}`,
      cityPayload
    )
  }

  getCities(): Observable<CityDto[]> {
    return this.http.get<CityDto[]>(
      `${this.baseUrlPub}/cities`
    )
  }

  getCitiesByCountry(cityId?: string): Observable<CityDto[]> {
    return this.http.get<CityDto[]>(
      `${this.baseUrlPub}/cities/countries/${cityId}`
    )
  }

  getCity(cityId?: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(
      `${this.baseUrlPub}/cities/${cityId}`
    )
  }

  getPropertyAddressByCity(cityId?: string): Observable<PropertyAddressDto[]> {
    return this.http.get<PropertyAddressDto[]>(
      `${this.baseUrlPub}/propertyAddress/cities/${cityId}`
    )
  }

  deleteCity(cityId?: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/cities/${cityId}`
    )
  }
}
