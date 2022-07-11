import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../services/storage/local-storage.service';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent implements OnInit {

  propertyId?: string | null;
  propertyTypeId?: string | null;

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.getPropertyId();
  }

  getPropertyId() {
  this.propertyId =  this.localStorageService.get('propertyId');
  this.propertyTypeId =  this.localStorageService.get('propertyTypeId');
  }

}
