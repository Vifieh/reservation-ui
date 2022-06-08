import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CustomDto} from '../../model/dto/customDto';
import {CountryService} from '../../services/country-service/country.service';
import {NotificationService} from '../../services/notification/notification.service';
import {CityService} from '../../services/city-service/city.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  countries: CustomDto[] = [];
  citiesByCountry: CustomDto[] = [];
  isDisplayed: boolean = false;
  propertyTypeId?: string | null;

  constructor(
    public formBuilder: FormBuilder,
    private countryService: CountryService,
    private cityService: CityService,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getCountries();
    this.propertyTypeId = this.route.snapshot.paramMap.get('id');
  }

  checkRadioButton(event: any) {
    this.isDisplayed = event.target.value !== 'no';
  }

  getCountries() {
    const countries = this.countryService.getCountries().subscribe(response => {
      this.countries = response;
    });
    this.subscriptions.push(countries);
  }

  countryChanged(event: any) {
    const countryId = event.target.value;
    this.getCitiesByCountry(countryId);
  }

  getCitiesByCountry(countryId: string) {
    const cities = this.cityService.getCitiesByCountry(countryId).subscribe(response => {
      this.citiesByCountry = response;
    });
    this.subscriptions.push(cities);
  }

  createPropertyForm = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      rating: ['', [Validators.required]],
    }
  )
}
