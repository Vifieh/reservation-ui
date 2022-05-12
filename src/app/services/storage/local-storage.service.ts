import { Injectable } from '@angular/core';
import {StorageData} from "../../model/storage-data.model";
import {LoginDto} from "../../model/loginDto";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  hasValue(key: string) {
    if (localStorage.hasOwnProperty(key)) {
      return true;
    }
    return false;
  }

  getStorageData(): LoginDto {
    const storage: LoginDto = JSON.parse(localStorage.getItem('data') ?? "{}");
    return storage;
  }

  setStorageData(data: StorageData) {
    localStorage.setItem('data', JSON.stringify(data))
  }
}
