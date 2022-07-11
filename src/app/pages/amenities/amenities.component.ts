import {Component, OnDestroy, OnInit} from '@angular/core';
import {GuestService} from '../../services/guest-service/guest.service';
import {Subscription} from 'rxjs';
import {AmenityDto, CustomDto} from '../../model/dto/customDto';
import {AmenityService} from '../../services/amenity-service/amenity.service';
import {CategoryAmenityService} from '../../services/category-amenity-service/category-amenity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {RoomService} from '../../services/room-service/room.service';
import {RoomDto} from '../../model/dto/roomDto';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Currency} from '../../enum/currency';
import {NotificationType} from '../../model/notificationMessage';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit, OnDestroy {
  numbers: number[] = [1, 2, 3, 4];
  ranges: string[] = ['Up to 12 years old', 'Up to 16 years old', 'Up to 6 years old'];
  subscriptions: Subscription[] = [];
  guests: CustomDto[] = [];
  amenities: AmenityDto[] = [];
  amenitiesByAmenityType: AmenityDto[] = [];
  amenityTypes: CustomDto[] = [];
  rooms: RoomDto[] = [];
  currencies = Currency;
  mostRequired: boolean = true;
  showSome: boolean = false;
  amenityTypeId?: string;
  isDisplayed: boolean = false;
  showRooms: boolean = false;
  isShow: boolean = false;
  showVariousRooms: boolean = false;
  showProperties: boolean = false;
  showRange: boolean = false;
  submitted: boolean = false;
  numberOfAmenities?: number;
  propertyId?: string | null;

  constructor(
    private guestService: GuestService,
    private amenityService: AmenityService,
    private amenityTypeService: CategoryAmenityService,
    private roomService: RoomService,
    private formBuilder: FormBuilder,
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
    this.getRoomsByPropertyId(this.propertyId);
  }

  addExtraBedOptionAndRoomAmenitiesForm = this.formBuilder.group({
    extraBedPayload: this.formBuilder.group({
      numberOfExtraBeds: [''],
      guestExtraBedPayloadList: this.formBuilder.array([]),
    }),
    roomAmenityPayloadList: this.formBuilder.array([]),
  });

  guestExtraBedPayload(): FormGroup {
    return this.formBuilder.group({
      guestId: [''],
      range: [''],
      currency: [''],
      unitPrice: [''],
    });
  }

  get guestExtraBedPayloadList() {
    return this.addExtraBedOptionAndRoomAmenitiesForm.get('extraBedPayload.guestExtraBedPayloadList') as FormArray;
  }

  addGuestExtraBed(event: any) {
    if (event.target.checked) {
      this.guestExtraBedPayloadList.push(this.guestExtraBedPayload());
    }else {
      const index = this.guestExtraBedPayloadList.controls.findIndex(x => x.value === event.target.value);
      this.guestExtraBedPayloadList.removeAt(index);
    }
  }

  roomAmenityPayload(): FormGroup {
    return this.formBuilder.group({
      amenityId: [''],
      rooms: this.formBuilder.array([]),
    });
  }

  get roomAmenityPayloadList() {
    return this.addExtraBedOptionAndRoomAmenitiesForm.get('roomAmenityPayloadList') as FormArray;
  }

  defaultPayload(): FormGroup {
    return this.formBuilder.group({
      id: [''],
    });
  }

  showText() {
    this.isShow = !this.isShow
  }

  checkGuest(i: number, event: any) {
    this.showProperties = event.target.checked;
    this.showRange = event.target.checked && i === 1;
  }

  checkRadioButton(event: any) {
    this.isDisplayed = event.target.value !== 'no';
  }

  clickCheckbox(event: any) {
    this.showRooms = event.target.checked;
  }

  checkAmenity(event: any) {
    this.showVariousRooms = event.target.checked;
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

  getRoomsByPropertyId(propertyId?: string | null) {
    const roomsSub = this.roomService.getRoomsOfUserByProperty(propertyId).subscribe(response => {
      this.rooms = response;
    });
    this.subscriptions.push(roomsSub);
  }

  addExtraBedOptionAndRoomAmenities() {
    this.submitted = true;
    if (!this.addExtraBedOptionAndRoomAmenitiesForm.valid) {
      const message = 'please fill all fields in the form';
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const addExtraBedOptionAndRoomAmenitiesSub = this.roomService.addExtraOptionAndRoomAmenities(this.propertyId, this.addExtraBedOptionAndRoomAmenitiesForm.value)
        .subscribe(response => {
          this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
          this.router.navigate(['/amenities', this.propertyId]);
        });
      this.subscriptions.push(addExtraBedOptionAndRoomAmenitiesSub);
    }
  }

}
