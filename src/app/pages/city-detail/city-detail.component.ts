import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CityDto} from '../../model/dto/cityDto';
import {CityService} from '../../services/city-service/city.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {PropertyDto} from '../../model/dto/propertyDto';
import {PropertyService} from '../../services/property-service/property.service';


@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  cities: CityDto[] = [];
  properties: PropertyDto[] = [];
  totalProperties: number = 0;
  cityId?: string | null;
  city!: CityDto;
  stars: number = 0;

  constructor(
    private cityService: CityService,
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
    this.cityId = this.route.snapshot.paramMap.get('id');
    this.getCity();
    this.getAllProperties();
  }

  getCity() {
    const citySub =  this.cityService.getCity(this.cityId).subscribe(response => {
      this.city = response;
    });
    this.subscriptions.push(citySub);
  }

  getAllProperties() {
    const propertiesSub = this.propertyService.getAllProperties(false, true).subscribe(response => {
      for (const property of response) {
        if (property.propertyAddressDto.cityDto.id === this.cityId) {
          this.properties.push(property);
        }
        if (property.rating === 5) {
          this.stars ++;
        }
      }
    });
    this.subscriptions.push(propertiesSub);
  }
}
