import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CustomDto} from '../../model/dto/customDto';
import {CityService} from '../../services/city-service/city.service';
import {CountryComponent} from '../country/country.component';
import {NotificationType} from '../../model/notificationMessage';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  cities: CustomDto[] = [];
  cityId?: string;

  constructor(
    private cityService: CityService,
    private notificationService: NotificationService,
  ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getCities();
  }


  getCities() {
    const citiesSub =  this.cityService.getCities().subscribe(response => {
      this.cities = response;
    });
    this.subscriptions.push(citiesSub);
  }

  delete(city: CustomDto) {
    this.cityId = city.id;
  }

  deleteCity() {
    const deleteCitySub = this.cityService.deleteCity(this.cityId).subscribe(response => {
      this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
    });
    this.subscriptions.push(deleteCitySub);
  }
}
