import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CustomPayload} from '../../model/payload/customPayload';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../../model/responseMessage';
import {CustomDto} from '../../model/dto/customDto';

@Injectable({
  providedIn: 'root'
})
export class PaymentOptionService {

  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createPaymentOption(paymentOptionPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/paymentOptions`,
      paymentOptionPayload
    )
  }

  editPaymentOption(paymentOptionId: string, paymentOptionPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/paymentOptions/${paymentOptionId}`,
      paymentOptionPayload
    )
  }

  getPaymentOptions(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPro}/paymentOptions`
    )
  }

  getPaymentOption(paymentOptionId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(`${this.baseUrlPro}/paymentOptions/${paymentOptionId}`)

  }

  deletePaymentOption(paymentOptionId: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(
      `${this.baseUrlPro}/paymentOptions/${paymentOptionId}`
    )
  }
}
