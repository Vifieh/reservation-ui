import {Component, OnDestroy, OnInit} from '@angular/core';
import {Type} from '../../enum/type';
import {Site} from '../../enum/site';
import {Available} from '../../enum/available';
import {Reservation} from '../../enum/reservation';
import {BreakfastAvailableService} from '../../services/breakfast-available-service/breakfast-available.service';
import {Subscription} from 'rxjs';
import {CustomDto, FacilityDto} from '../../model/dto/customDto';
import {LanguageService} from '../../services/language-service/language.service';
import {FacilityService} from '../../services/facility-service/facility.service';
import {Status} from '../../enum/status';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {NotificationType} from '../../model/notificationMessage';
import {NotificationService} from '../../services/notification/notification.service';
import {PropertyService} from '../../services/property-service/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Currency} from '../../enum/currency';

@Component({
  selector: 'app-facilities-services',
  templateUrl: './facilities-services.component.html',
  styleUrls: ['./facilities-services.component.css']
})
export class FacilitiesServicesComponent implements OnInit, OnDestroy {

  parkingFacilities = [
    {key: Available.NO, value: 'No'},
    {key: Available.YES_PAID, value: 'Yes, paid'},
    {key: Available.YES_FREE, value: 'Yes, free'}
  ];
  parkingTypes = [
    {key: Type.PRIVATE, value: 'Private'},
    {key: Type.PUBLIC, value: 'Public'}
  ];
  sites = [
    {key: Site.ON_SITE, value: 'On site'},
    {key: Site.OFF_SITE, value: 'Off site'},
  ];
  reservations = [
    {key: Reservation.RESERVATION, value: 'Reservation needed'},
    {key: Reservation.NO_RESERVATION, value: 'No Reservation needed'}
  ];
  breakfastAvailability = [
    {key: Available.NO, value: 'No'},
    {key: Available.YES_FREE, value: 'Yes, it\'s included in the price'},
    {key: Available.YES_PAID, value: 'Yes, it\'s optional'}
  ];
  facilityStatus = [
    {key: Status.FREE, value: 'Free'},
    {key: Status.PAID, value: 'Paid'},
  ];
  subscriptions: Subscription[] = [];
  breakfastsAvailable: CustomDto[] = [];
  languages: CustomDto[] = [];
  facilities: FacilityDto[] = [];
  currencies = Currency;
  isDisplayed: boolean = false;
  isPriceShown: boolean = false;
  isShowed: boolean = false;
  isIncluded: boolean = false;
  displaySelect: boolean = false;
  displayField: boolean = false;
  submitted: boolean = false;
  showLanguageDelete: boolean = false;
  showBreakfastDelete: boolean = false;
  propertyId?: string | null;

  constructor(
    private breakfastAvailableService: BreakfastAvailableService,
    private languageService: LanguageService,
    private facilityService: FacilityService,
    private propertyService: PropertyService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
  ) {
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getBreakfastsAvailable();
    this.getLanguages();
    this.getFacilities();
    this.propertyId = this.route.snapshot.paramMap.get('id');
  }

  addFacilitiesAndServicesForm = this.formBuilder.group({
    parkingPayload: this.formBuilder.group({
      available: [''],
      type: [''],
      site: [''],
      reservation: [''],
      unitPrice: [''],
      currency: ['XAF'],
    }),
    breakfastPayload: this.formBuilder.group({
      unitPrice: [''],
      available: [''],
      currency: [''],
      breakfastAvailablePayload: this.formBuilder.array([
        this.defaultPayload(),
      ]),
    }),
    languagePayload: this.formBuilder.array([
      this.customPayload(),
    ]),
    propertyFacilityPayloadList: this.formBuilder.array([
    ]),
  });

  defaultPayload(): FormGroup {
    return this.formBuilder.group({
      id: [''],
    });
  }

  get breakfastAvailablePayload() {
    return this.addFacilitiesAndServicesForm.get('breakfastPayload.breakfastAvailablePayload') as FormArray;
  }

  addBreakfastAvailablePayload() {
    this.breakfastAvailablePayload.push(this.defaultPayload());
    this.showBreakfastDelete = true;
  }

  deleteBreakfastAvailablePayload(breakfastIndex: number) {
    this.breakfastAvailablePayload.removeAt(breakfastIndex);
  }

  customPayload(): FormGroup {
    return this.formBuilder.group({
      name: [''],
    });
  }

  get languagePayload() {
    return this.addFacilitiesAndServicesForm.get('languagePayload') as FormArray;
  }

  addLanguagePayload() {
    this.languagePayload.push(this.customPayload());
    this.showLanguageDelete = true;
  }

  deleteLanguagePayload(languageIndex: number) {
    this.languagePayload.removeAt(languageIndex);
  }

  get propertyFacilityPayloadList() {
    return this.addFacilitiesAndServicesForm.get('propertyFacilityPayloadList') as FormArray;
  }

  propertyFacilityForm(id: string): FormGroup {
    return this.formBuilder.group({
        facilityId: [id],
        status: ['FREE'],
    });
  }

  addPropertyFacilityPayloadItem(event: any) {
    this.displaySelect = event.currentTarget.checked;
    if (event.target.checked) {
      this.propertyFacilityPayloadList.push(this.propertyFacilityForm(event.target.value));
    }else {
      const index = this.propertyFacilityPayloadList.controls.findIndex(x => x.value === event.target.value);
      this.propertyFacilityPayloadList.removeAt(index);
    }
  }

  checkStatus(event: any) {
    this.isDisplayed = event.target.value !== 'NO';
    this.isPriceShown = event.target.value !== 'YES_FREE';
  }

  checkBreakfast(event: any) {
    this.isShowed = event.target.value !== 'NO';
    this.isIncluded = event.target.value !== 'YES_FREE';
  }

  getBreakfastsAvailable() {
    const breakfastsAvailable = this.breakfastAvailableService.getAllBreakfastAvailable().subscribe(response => {
      this.breakfastsAvailable = response;
    });
    this.subscriptions.push(breakfastsAvailable);
  }

  getLanguages() {
    const languages = this.languageService.getLanguages().subscribe(response => {
      this.languages = response;
    });
    this.subscriptions.push(languages);
  }

  getFacilities() {
    const facilities = this.facilityService.getFacilities().subscribe(response => {
      this.facilities = response;
      this.displayChoice(this.facilities);
    });
    this.subscriptions.push(facilities);
  }

  displayChoice(facilities: FacilityDto[]) {
    for (let facility of facilities) {
      if (facility.choice) {
        this.displayField = true;
      }
    }
  }

  addFacilitiesAndServices() {
    this.submitted = true;
    if (!this.addFacilitiesAndServicesForm.valid) {
      const message = 'please fill all fields in the form';
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const addFacilitiesAndServicesSub = this.propertyService.addFacilitiesAndServices(this.propertyId, this.addFacilitiesAndServicesForm.value)
        .subscribe(response => {
          this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
          this.router.navigate(['/amenities', this.propertyId]);
        });
      this.subscriptions.push(addFacilitiesAndServicesSub);
    }
  }
}
