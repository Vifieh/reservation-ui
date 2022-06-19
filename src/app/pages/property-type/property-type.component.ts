import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PropertyTypeService} from '../../services/property-type-service/property-type.service';
import {PropertyTypeDto} from '../../model/dto/property-type-dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.css']
})
export class PropertyTypeComponent implements OnInit, OnDestroy {
  isClicked: boolean = false;
  isClicked1: boolean = false;
  isHide: boolean = false;
  isHide1: boolean = false;
  isOption: boolean = true;
  subscriptions: Subscription[] = [];
  propertyTypes: PropertyTypeDto[] = [];
  propertyTypeName?: string = '';
  propertyTypeId?: string = '';
  oneRoom: string = '';

  constructor(
    private propertyTypeService: PropertyTypeService,
    private router: Router,
  ) {
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getPropertyTypes();
  }

  property(propertyType: PropertyTypeDto) {
    this.isClicked = !this.isClicked;
    this.propertyTypeName = propertyType.name;
    this.propertyTypeId = propertyType.id;
  }

  property1() {
    this.isClicked1 = true;
    this.isHide = true;
  }

  property2() {
    this.isClicked1 = false;
  }

  hotel() {
    this.isHide = false;
    this.isClicked1 = false;
  }

  hotel1() {
    this.isHide1 = true;
    this.isClicked1 = false;
  }

  showTOption() {
    this.isOption = !this.isOption;
  }

  clickOne() {
    // @ts-ignore
    this.oneRoom = document.getElementById('oneRoom').value;
    console.log(this.oneRoom);
    // @ts-ignore
    console.log(document.getElementById('oneRoom').value);
  }

  getPropertyTypes() {
    const propertyTypes = this.propertyTypeService.getPropertyTypes().subscribe(response => {
      this.propertyTypes = response;
    });
    this.subscriptions.push(propertyTypes);
  }

  getPropertyTypeId() {
    this.router.navigate(['/basic-info', this.propertyTypeId])
  }
}
