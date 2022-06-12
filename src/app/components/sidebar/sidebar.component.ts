import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {CountryService} from '../../services/country-service/country.service';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationType} from '../../model/notificationMessage';
import {CountryComponent} from '../../pages/country/country.component';
import {CustomDto} from '../../model/dto/customDto';
import {CityService} from '../../services/city-service/city.service';
import {CategoryAmenityService} from '../../services/category-amenity-service/category-amenity.service';
import {AmenityService} from '../../services/amenity-service/amenity.service';
import {RoomTypeService} from '../../services/room-type-service/room-type.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  submitted = false;
  subscriptions: Subscription[] = []
  countries: CustomDto[] = [];
  amenityTypes: CustomDto[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private countryService: CountryService,
    private cityService: CityService,
    private categoryAmenityService: CategoryAmenityService,
    private amenityService: AmenityService,
    private roomTypeService: RoomTypeService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.getAmenityTypes();
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

  createCityForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]],
      countryId: ['', [Validators.required]]
    }
  );

  createAmenityTypeForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]],
    }
  );

  createAmenityForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]],
      amenityType: ['', [Validators.required]]
    }
  );

  createRoomTypeForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]],
    }
  );

  get formValuesCountry(): { [key: string]: AbstractControl } {
    return this.createCountryForm.controls;
  }

  get formValuesCity(): { [key: string]: AbstractControl } {
    return this.createCityForm.controls;
  }

  get formValuesAmenityType(): { [key: string]: AbstractControl } {
    return this.createAmenityTypeForm.controls;
  }

  get formValuesAmenity(): { [key: string]: AbstractControl } {
    return this.createAmenityForm.controls;
  }

  createCountry() {
    this.submitted  = true
    if (!this.createCountryForm.valid) {
      const message = "please fill all fields in the form";
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const createCountrySub = this.countryService.createCountry(this.createCountryForm.value)
        .subscribe(response => {
          this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
        })
    this.subscriptions.push(createCountrySub);
    }
  }

  getCountries() {
    const countries = this.countryService.getCountries().subscribe(response => {
      this.countries = response;
    });
    this.subscriptions.push(countries);
  }

  createCity(countryId: string) {
    this.submitted  = true
    if (!this.createCityForm.valid) {
      const message = "please fill all fields in the form";
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const createCitySub = this.cityService.createCity(countryId, this.createCityForm.value)
        .subscribe(response => {
          this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
        })
    this.subscriptions.push(createCitySub);
    }
  }

  createAmenityType() {
    this.submitted  = true
    if (!this.createAmenityTypeForm.valid) {
      const message = "please fill all fields in the form";
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const createAmenityTypeSub = this.categoryAmenityService.createCategoryAmenity(this.createAmenityTypeForm.value)
        .subscribe(response => {
          this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
        })
      this.subscriptions.push(createAmenityTypeSub);
    }
  }

  getAmenityTypes() {
    const amenityTypes = this.categoryAmenityService.getAllCategoryAmenity().subscribe(response => {
      this.amenityTypes = response;
    });
    this.subscriptions.push(amenityTypes);
  }

  createAmenity(amenityTypeId: string) {
    this.submitted  = true
    if (!this.createAmenityForm.valid) {
      const message = "please fill all fields in the form";
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const createAmenitySub = this.amenityService.createAmenity(amenityTypeId, this.createAmenityForm.value)
        .subscribe(response => {
          console.log(this.createAmenityForm.value);
          console.log(response.message);
          this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
        })
      this.subscriptions.push(createAmenitySub);
    }
  }

  createRoomType() {
    this.submitted  = true
    if (!this.createRoomTypeForm.valid) {
      const message = "please fill all fields in the form";
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const createRoomTypeSub = this.roomTypeService.createRoomType(this.createRoomTypeForm.value)
        .subscribe(response => {
          this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
        })
      this.subscriptions.push(createRoomTypeSub);
    }
  }
}
