import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseMessage} from 'src/app/model/responseMessage';
import {CustomPayload} from "../../model/payload/customPayload";
import {CustomDto} from "../../model/dto/customDto";

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
      `${this.baseUrlPro}/countries/countryId=${countryId}`,
      cityPayload
    )
  }

  editCity(cityId: string, cityPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/cities/cityId=${cityId}`,
      cityPayload
    )
  }

  getCities(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPub}/cities`
    )
  }

  getCitiesByCountry(cityId: string): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPub}/cities/${cityId}`
    )
  }

  getCity(cityId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(
      `${this.baseUrlPub}/cities/${cityId}`
    )
  }

  deleteCity(cityId: string): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(
      `${this.baseUrlPro}/cities/${cityId}`
    )
  }
}
