import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CityDto} from '../../model/dto/cityDto';
import {PropertyDto} from '../../model/dto/propertyDto';
import {CityService} from '../../services/city-service/city.service';
import {PropertyService} from '../../services/property-service/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationType} from '../../model/notificationMessage';

@Component({
  selector: 'app-pending-properties',
  templateUrl: './pending-properties.component.html',
  styleUrls: ['./pending-properties.component.css']
})
export class PendingPropertiesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  properties: PropertyDto[] = [];
  property?: PropertyDto;
  propertyId?: String | null;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getAllProperties();
  }

  getProperty(property: PropertyDto) {
    this.propertyId = property.id;
  }

  getAllProperties() {
    const propertiesSub = this.propertyService.getAllProperties(true, true).subscribe(response => {
      this.properties = response;
    });
    this.subscriptions.push(propertiesSub);
  }

  approveProperty() {
    const responseSub = this.propertyService.approveProperty(this.propertyId, null).subscribe(response => {
      this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
    });
    this.subscriptions.push(responseSub);
  }
}
