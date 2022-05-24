import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CustomDto} from '../../model/dto/customDto';
import {CityService} from '../../services/city-service/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  cities: CustomDto[] = [];

  constructor(
    private cityService: CityService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  getCities() {
    const cities =  this.cityService.getCities().subscribe(response => {
      this.cities = response;
    });
    this.subscriptions.push(cities);
  }

}
