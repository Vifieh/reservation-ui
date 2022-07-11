import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginPayload, RegisterPayload} from "../../model/user";
import {Observable} from "rxjs";
import {LoginDto} from "../../model/dto/loginDto";
import {environment} from "../../../environments/environment";
import {ResponseMessage} from 'src/app/model/responseMessage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  register(registerPayload: RegisterPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrl}/register`,
      registerPayload
    );
  }

  login(loginPayload: LoginPayload): Observable<LoginDto> {
    return this.http.post<LoginDto>(
      `${this.baseUrl}/login`,
      loginPayload
    );
  }

  resendVerification(email: string): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.baseUrl}/resend-verification-link`,
      email
    );
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/refreshToken`,
      token
    );
  }
}
