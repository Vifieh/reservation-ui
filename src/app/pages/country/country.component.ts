import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CountryService} from '../../services/country-service/country.service';
import {CustomDto} from '../../model/dto/customDto';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  countries: CustomDto[] = [];

  constructor(
    private countryService: CountryService,
  ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
      const countries = this.countryService.getCountries().subscribe(response => {
        this.countries = response;
      });
    this.subscriptions.push(countries);
  }
}
