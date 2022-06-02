import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CustomDto} from '../../model/dto/customDto';
import {CountryService} from '../../services/country-service/country.service';
import {NotificationService} from '../../services/notification/notification.service';
import {CategoryAmenityService} from '../../services/category-amenity-service/category-amenity.service';
import {NotificationType} from '../../model/notificationMessage';

@Component({
  selector: 'app-category-amenity',
  templateUrl: './category-amenity.component.html',
  styleUrls: ['./category-amenity.component.css']
})
export class CategoryAmenityComponent implements OnInit, OnDestroy {

  count: number = 0;
  subscriptions: Subscription[] = [];
  amenityTypes: CustomDto[] = [];
  amenityTypeId?: string;

  constructor(
    private categoryAmenityService: CategoryAmenityService,
    private notificationService: NotificationService,
) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
    sub.unsubscribe();
  }
}

  ngOnInit(): void {
    this.getAmenityTypes();
  }

  getAmenityTypes() {
    const amenityTypes = this.categoryAmenityService.getAllCategoryAmenity().subscribe(response => {
      this.amenityTypes = response;
    });
    this.subscriptions.push(amenityTypes);
  }

  delete(amenityTypeId?: string) {
    this.amenityTypeId = amenityTypeId;
  }

  deleteAmenityType() {
    const deleteAmenityType = this.categoryAmenityService.deleteCategoryAmenity(this.amenityTypeId).subscribe(response => {
      this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
    });
    this.subscriptions.push(deleteAmenityType);
  }
}
