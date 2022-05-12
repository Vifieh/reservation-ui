import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import {LocalStorageService} from "../services/storage/local-storage.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const data = this.localStorageService.getStorageData();
    request =  request.clone({
      url: request.url,
      setHeaders: {
        Authorization: `Bearer ${data.accessToken}`
      }
    });
    // if(this.localStorageService.get('accessToken') != null){
    //   const token = this.localStorageService.get('accessToken');
    //   const headers = new HttpHeaders().set("accessToken", token);
    //   const AuthRequest = request.clone({headers: headers});
    //   return  next.handle(AuthRequest)
    // }
    return next.handle(request);
  }
}
