import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PropertyDto} from '../../model/dto/propertyDto';
import {PropertyService} from '../../services/property-service/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-approved-properties',
  templateUrl: './approved-properties.component.html',
  styleUrls: ['./approved-properties.component.css']
})
export class ApprovedPropertiesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  properties: PropertyDto[] = [];
  property?: PropertyDto;

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

  getAllProperties() {
    const propertiesSub = this.propertyService.getAllProperties(false, true).subscribe(response => {
      this.properties = response;
    });
    this.subscriptions.push(propertiesSub);
  }
}
