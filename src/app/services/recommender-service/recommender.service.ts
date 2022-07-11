import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommenderService {

  baseUrl: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  recommendHotel(location: string | null | undefined, description: string | null | undefined): Observable<any> {
    return this.http.get<any>(
        `${this.baseUrl}/recommend/${location}/${description}`
    )
  }
}
