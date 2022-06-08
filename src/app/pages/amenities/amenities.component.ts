import {Component, OnDestroy, OnInit} from '@angular/core';
import {GuestService} from '../../services/guest-service/guest.service';
import {Subscription} from 'rxjs';
import {CustomDto} from '../../model/dto/customDto';
import {AmenityService} from '../../services/amenity-service/amenity.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit, OnDestroy {

  numbers: number[] = [1, 2, 3, 4];
  subscriptions: Subscription[] = [];
  guests: CustomDto[] = [];
  amenities: CustomDto[] = [];
  mostRequired = true;

  constructor(
    private guestService: GuestService,
    private amenityService: AmenityService,
  ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getGuest();
    this.getAmenities();
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

}
