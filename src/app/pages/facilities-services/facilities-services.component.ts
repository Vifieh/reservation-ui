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
  isDisplayed: boolean = false;
  isPriceShown: boolean = false;
  isShowed: boolean = false;
  isIncluded: boolean = false;
  displaySelect: boolean = false;
  displayField: boolean = false;

  constructor(
    private breakfastAvailableService: BreakfastAvailableService,
    private languageService: LanguageService,
    private facilityService: FacilityService,
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

  checkChange(event: any, facility: FacilityDto) {
    console.log(facility);
    this.displaySelect = event.target.value === facility.id && facility.choice;
  }
}
