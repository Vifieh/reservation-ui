import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {CountryService} from '../../services/country-service/country.service';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationType} from '../../model/notificationMessage';
import {CountryComponent} from '../../pages/country/country.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  submitted = false;
  subscriptions: Subscription[] = []

  constructor(
    public formBuilder: FormBuilder,
    private countryService: CountryService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    // this.getCountries();
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  createCountryForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]],
    }
  );

  get formValues(): { [key: string]: AbstractControl } {
    return this.createCountryForm.controls;
  }

  createCountry() {
    this.submitted  = true
    if (!this.createCountryForm.valid) {
      alert("please fill field in the form")
    } else {
      const createCountrySub = this.countryService.createCountry(this.createCountryForm.value)
        .subscribe(response => {
          this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
        })
    this.subscriptions.push(createCountrySub);
    }
  }

  // getCountries() {
  //    this.countryComponent.getCountries();
  // }

}
