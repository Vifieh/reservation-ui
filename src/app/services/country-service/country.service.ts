import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CustomPayload} from "../../model/customPayload";
import {catchError, Observable, retry, throwError} from "rxjs";
import {CustomDto} from "../../model/customDto";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createCountry(country: CustomPayload): Observable<Response> {
    return this.http.post<Response>(this.baseUrlPro + 'countries', country)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  editCountry(countryId: string, country: CustomPayload): Observable<Response> {
    return this.http.patch<Response>(this.baseUrlPro + `countries/${countryId}`, country)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCountries(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(this.baseUrlPub + 'countries')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
}

  getCountry(countryId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(this.baseUrlPub + `countries/${countryId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteCountry(countryId: string): Observable<Response> {
    return this.http.get<Response>(this.baseUrlPro + `countries/${countryId}`)
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
