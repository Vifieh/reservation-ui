import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CustomDto} from '../../model/dto/customDto';
import {CountryService} from '../../services/country-service/country.service';
import {NotificationService} from '../../services/notification/notification.service';
import {CityService} from '../../services/city-service/city.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertyService} from '../../services/property-service/property.service';
import {NotificationType} from '../../model/notificationMessage';
import {LocalStorageService} from '../../services/storage/local-storage.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit, OnDestroy {
  submitted = false;
  subscriptions: Subscription[] = [];
  countries: CustomDto[] = [];
  citiesByCountry: CustomDto[] = [];
  isDisplayed: boolean = false;
  propertyTypeId?: string | null;
  propertyId?: string;

  constructor(
    public formBuilder: FormBuilder,
    private countryService: CountryService,
    private cityService: CityService,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getCountries();
    this.propertyTypeId = this.route.snapshot.paramMap.get('id');

  }

  createPropertyForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    rating: ['', [Validators.required]],
    propertyContactDetailsPayload: this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      alternativeNumber: [''],
      companyName: [''],
    }),
    propertyAddressPayload: this.formBuilder.group({
      streetAddress: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      code: ['', [Validators.required]],
      cityPayload: this.formBuilder.group({
        id: ['', [Validators.required]],
      }),
    }),
  });

  get formValues(): { [key: string]: AbstractControl } {
    return this.createPropertyForm.controls;
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

  createProperty() {
    this.submitted = true;
    if (!this.createPropertyForm.valid) {
      const message = 'please fill all fields in the form';
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const createPropertySub = this.propertyService.createProperty(this.propertyTypeId, this.createPropertyForm.value)
        .subscribe(response => {
          this.localStorageService.set('propertyId', response.id);
          if (this.propertyTypeId != null) {
            this.localStorageService.set('propertyTypeId', this.propertyTypeId);
          }
          this.router.navigate(['/layouts', response.id]);
        });
      this.subscriptions.push(createPropertySub);
    }
  }

}
