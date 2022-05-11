import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginPayload, RegisterPayload} from "../../model/user";
import { Observable} from "rxjs";
import {LoginDto} from "../../model/loginDto";
import {environment} from "../../../environments/environment";
import { Response } from 'src/app/model/response';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  register(registerPayload: RegisterPayload): Observable<Response> {
    return this.http.post<Response>(
      `${this.baseUrl}register`,
      registerPayload
    );
  }

  login(loginPayload: LoginPayload): Observable<LoginDto> {
    return this.http.post<LoginDto>(
      `${this.baseUrl}login`,
      loginPayload
    );
  }

  resendVerification(email: string): Observable<Response> {
    return this.http.put<Response>(
      `${this.baseUrl}resend-verification-link`,
      email
    );
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post(  `${this.baseUrl}refreshToken`,
      token
    );

  }
}
