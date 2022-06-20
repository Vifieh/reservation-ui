import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitService {

   eventEmitter = new EventEmitter<string | null>();



  constructor() { }
}
