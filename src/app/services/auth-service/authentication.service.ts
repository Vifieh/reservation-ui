import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginPayload, RegisterPayload} from "../../model/user";
import { Observable, throwError} from "rxjs";
import {catchError, retry, tap} from "rxjs";
import {LoginDto} from "../../model/loginDto";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  register(registerPayload: RegisterPayload): Observable<Response> {
    return this.http.post<Response>(this.baseUrl + 'register', registerPayload)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  login(loginPayload: LoginPayload): Observable<LoginDto> {
    return this.http.post<LoginDto>(this.baseUrl + 'login', loginPayload)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  resendVerification(email: string): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + 'resend-verification-link', email)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post(this.baseUrl + 'refreshToken', token)
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
