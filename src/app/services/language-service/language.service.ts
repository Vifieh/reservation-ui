import { Injectable } from '@angular/core';
import {CustomPayload} from '../../model/payload/customPayload';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {CustomDto} from '../../model/dto/customDto';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createLanguage(languagePayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/languages`,
      languagePayload
    )
  }

  editLanguage(languageId: string, languagePayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/languages/${languageId}`,
      languagePayload
    )
  }

  getLanguages(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPub}/languages`
    )
  }

  getLanguage(languageId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(`${this.baseUrlPub}/languages/${languageId}`)

  }

  deleteLanguage(languageId: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/languages/${languageId}`
    )
  }
}
