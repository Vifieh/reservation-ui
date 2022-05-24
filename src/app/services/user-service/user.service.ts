import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {UserDetailsDto} from '../../model/dto/user-details-dto';
import {HttpClient} from '@angular/common/http';
import {ResponseMessage} from '../../model/responseMessage';
import {UserPayload} from '../../model/payload/user-payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserDetailsDto> {
    return this.http.get<UserDetailsDto>(
      `${this.baseUrlPro}/users/user_profile`
    )
  }

  editUserProfile(userPayload: UserPayload): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${this.baseUrlPro}/users/edit-profile`,
      userPayload
    )
  }

  getUsers(): Observable<UserDetailsDto[]> {
    return this.http.get<UserDetailsDto[]>(
      `${this.baseUrlPro}/users`
    )
  }

  getUsersByRoleUser(): Observable<UserDetailsDto[]> {
    return this.http.get<UserDetailsDto[]>(
      `${this.baseUrlPro}/users/role_user`
    )
  }

  getUser(userId: string): Observable<UserDetailsDto> {
    return this.http.get<UserDetailsDto>(
      `${this.baseUrlPro}/users/${userId}`
    )
  }

}
