import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CountryService} from '../../services/country-service/country.service';
import {CustomDto} from '../../model/dto/customDto';
import {NotificationType} from '../../model/notificationMessage';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  countries: CustomDto[] = [];
  countryId?: string;

  constructor(
    private countryService: CountryService,
    private notificationService: NotificationService,
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

  delete(country: CustomDto) {
    this.countryId = country.id;
  }

  deleteCountry() {
    const deleteCountry = this.countryService.deleteCountry(this.countryId).subscribe(response => {
      this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
    })
    this.subscriptions.push(deleteCountry);
  }
}
