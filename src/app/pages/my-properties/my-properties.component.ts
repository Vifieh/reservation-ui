import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PropertyDto} from '../../model/dto/propertyDto';
import {PropertyService} from '../../services/property-service/property.service';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  properties: PropertyDto[] = [];

  constructor(
    private propertyService: PropertyService,
  ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getAllProperties();
  }

  getAllProperties() {
    const propertiesSub = this.propertyService.getAllPropertiesOfUser().subscribe(response => {
      this.properties = response;
    });
    this.subscriptions.push(propertiesSub);
  }
}
