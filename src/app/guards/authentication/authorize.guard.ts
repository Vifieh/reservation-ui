import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {StorageData} from "../../model/storage-data.model";
import {LocalStorageService} from "../../services/storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private localStorageServe: LocalStorageService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const storage: StorageData = this.localStorageServe.getStorageData();
    const isLogin = new Date().getTime() < Number(storage.expiredIn);
    if (storage === undefined) {
      return false;
    }
    return true;
  }

}
