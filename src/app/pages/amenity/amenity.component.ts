import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CustomDto} from '../../model/dto/customDto';
import {AmenityService} from '../../services/amenity-service/amenity.service';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationType} from '../../model/notificationMessage';

@Component({
  selector: 'app-amenity',
  templateUrl: './amenity.component.html',
  styleUrls: ['./amenity.component.css']
})
export class AmenityComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  amenities: CustomDto[] = [];
  amenityId?: string;
  mostRequired = false;

  constructor(
    private amenityService: AmenityService,
    private notificationService: NotificationService,
  ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getAmenities();
  }

  getAmenities() {
    const amenities = this.amenityService.getAmenities(this.mostRequired).subscribe(response => {
      this.amenities = response;
    });
    this.subscriptions.push(amenities);
  }

  delete(amenity: CustomDto) {
    this.amenityId = amenity.id;
  }

  deleteAmenity() {
    const deleteAmenity = this.amenityService.deleteAmenity(this.amenityId).subscribe(response => {
      this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
    })
    this.subscriptions.push(deleteAmenity);
  }

}
