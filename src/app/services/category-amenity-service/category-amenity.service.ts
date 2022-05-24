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
export class CategoryAmenityService {
  baseUrlPro: string = environment.baseUrlPro;
  baseUrlPub: string = environment.baseUrlPub;

  constructor(private http: HttpClient) { }

  createCategoryAmenity(categoryAmenityPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      `${this.baseUrlPro}/categoryAmenities`,
      categoryAmenityPayload
    )
  }

  editCategoryAmenity(categoryId: string, categoryAmenityPayload: CustomPayload): Observable<ResponseMessage> {
    return this.http.patch<ResponseMessage>(
      `${this.baseUrlPro}/categoryAmenities/${categoryId}`,
      categoryAmenityPayload
    )
  }

  getAllCategoryAmenity(): Observable<CustomDto[]> {
    return this.http.get<CustomDto[]>(
      `${this.baseUrlPub}/categoryAmenities`
    )
  }

  getCategoryAmenity(categoryId: string): Observable<CustomDto> {
    return this.http.get<CustomDto>(`${this.baseUrlPub}/categoryAmenities/${categoryId}`)

  }

  deleteCategoryAmenity(categoryId: string): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(
      `${this.baseUrlPro}/categoryAmenities/${categoryId}`
    )
  }
}
