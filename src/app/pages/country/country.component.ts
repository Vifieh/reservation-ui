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

  count: number = 0;
  subscriptions: Subscription[] = [];
  countries: CustomDto[] = [];

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

  deleteCountry(countryId: string) {
    const deleteCountry = this.countryService.deleteCountry(countryId).subscribe(response => {
      this.notificationService.sendMessage({message: response.message, type: NotificationType.warning});
    })
    this.subscriptions.push(deleteCountry);
  }
}
