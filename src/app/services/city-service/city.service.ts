import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import { Response } from 'src/app/model/response';
import {CustomPayload} from "../../model/customPayload";
import {CustomDto} from "../../model/customDto";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createCity(countryId: string, city: CustomPayload): Observable<Response> {
    return this.http.post<Response>(this.baseUrlPro + `countries/countryId=${countryId}`, city)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  editCity(cityId: string, city: CustomPayload): Observable<Response> {
    return this.http.patch<Response>(this.baseUrlPro + `cities/cityId=${cityId}`, city)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCities(): Observable<CustomDto> {
    return this.http.get<CustomDto>(this.baseUrlPub + 'cities')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
}

  getCity(cityId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(this.baseUrlPub + `cities/${cityId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteCity(cityId: string): Observable<Response> {
    return this.http.get<Response>(this.baseUrlPro + `cities/${cityId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occurred - Error code: ${error.status}`);
  }
}
