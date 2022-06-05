import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CustomPayload} from "../../model/payload/customPayload";
import {Observable} from "rxjs";
import {CustomDto} from "../../model/dto/customDto";
import {ResponseMessage} from 'src/app/model/responseMessage';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) {
  }

  createCountry(countryPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/countries`,
      countryPayload
    )
  }

  editCountry(countryId: string, countryPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/countries/${countryId}`,
      countryPayload
    )
  }

  getCountries(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPub}/countries`
    )
  }

  getCountry(countryId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(`${this.baseUrlPub}/countries/${countryId}`)

  }

  deleteCountry(countryId?: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/countries/${countryId}`
    )
  }
}
