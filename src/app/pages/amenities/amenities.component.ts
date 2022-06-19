import {Component, OnDestroy, OnInit} from '@angular/core';
import {GuestService} from '../../services/guest-service/guest.service';
import {Subscription} from 'rxjs';
import {AmenityDto, CustomDto} from '../../model/dto/customDto';
import {AmenityService} from '../../services/amenity-service/amenity.service';
import {CategoryAmenityService} from '../../services/category-amenity-service/category-amenity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit, OnDestroy {
  isShow: boolean = false;
  numbers: number[] = [1, 2, 3, 4];
  subscriptions: Subscription[] = [];
  guests: CustomDto[] = [];
  amenities: AmenityDto[] = [];
  amenitiesByAmenityType: AmenityDto[] = [];
  amenityTypes: CustomDto[] = [];
  mostRequired:boolean = true;
  amenityTypeId?: string;
  numberOfAmenities?: number;
  propertyId?: string | null;
  isDisplayed: boolean = false;


  constructor(
    private guestService: GuestService,
    private amenityService: AmenityService,
    private amenityTypeService: CategoryAmenityService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getGuest();
    this.getAmenities();
    this.getAmenityTypes();
    this.propertyId = this.route.snapshot.paramMap.get('id');
  }

  showText() {
    this.isShow = !this.isShow
  }

  checkRadioButton(event: any) {
    this.isDisplayed = event.target.value !== 'no';
  }

  getAmenityTypeId(amenityTypeId: string) {
    this.amenityTypeId = amenityTypeId;
    this.getAmenitiesByAmenityType(this.amenityTypeId);
  }

  getGuest() {
    const guests = this.guestService.getGuests().subscribe(response => {
      this.guests = response;
    });
    this.subscriptions.push(guests);
  }

  getAmenities() {
    const amenities = this.amenityService.getAmenities(this.mostRequired).subscribe(response => {
      this.amenities = response;
    });
    this.subscriptions.push(amenities);
  }

  getAmenityTypes() {
    const amenityTypes = this.amenityTypeService.getAllCategoryAmenity().subscribe(response => {
      this.amenityTypes = response;
    });
    this.subscriptions.push(amenityTypes);
  }

  getAmenitiesByAmenityType(amenityTypeId: string) {
    const amenitiesByAmenityType = this.amenityService.getAmenitiesByCategory(amenityTypeId,  !this.mostRequired).subscribe(response => {
      this.amenitiesByAmenityType = response;
      this.numberOfAmenities = this.amenitiesByAmenityType.length;
    });
    this.subscriptions.push(amenitiesByAmenityType);
  }
}
