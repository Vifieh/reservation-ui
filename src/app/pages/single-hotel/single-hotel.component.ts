import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../services/notification/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertyService} from '../../services/property-service/property.service';
import {PropertyDto} from '../../model/dto/propertyDto';
import {ViewportScroller} from '@angular/common';
import {RoomService} from '../../services/room-service/room.service';
import {RoomDto} from '../../model/dto/roomDto';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomDto} from '../../model/dto/customDto';
import {CountryService} from '../../services/country-service/country.service';
import {RoomReservationService} from '../../services/room-reservation-service/room-reservation.service';
import {NotificationType} from '../../model/notificationMessage';
import {Currency} from '../../enum/currency';
import {FacilityService} from '../../services/facility-service/facility.service';
import {PropertyFacilityDto} from '../../model/dto/propertyFacilityDto';
import {RoomReservationDto, RoomReservationResponse} from '../../model/dto/roomReservationDto';

@Component({
  selector: 'app-single-hotel',
  templateUrl: './single-hotel.component.html',
  styleUrls: ['./single-hotel.component.css']
})
export class SingleHotelComponent implements OnInit, OnDestroy {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<<', '>>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 3
      }
    },
    nav: true
  };

  adults: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  children: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  subscriptions: Subscription[] = [];
  rooms: RoomDto[] = [];
  countries: CustomDto[] = [];
  propertyFacilities: PropertyFacilityDto[] = [];
  property!: PropertyDto;
  reservation!: RoomReservationResponse;
  room?: RoomDto;
  propertyId?: string | null;
  roomPrice?: number;
  guestEmail!: string;
  fullName!: string;
  slides: any[] = [];
  checkIn!: Date;
  checkOut!: Date;
  diffDays: number = 0;
  showHotel: boolean = true;
  showPrice: boolean = true;
  showReservation: boolean = false;
  showTableField: boolean = false;
  showGuestEmail: boolean = true;
  submitted: boolean = false;
  reference: string = '';
  price: number = 0;
  newReservation: any;

  constructor(
    private propertyService: PropertyService,
    private roomService: RoomService,
    private countryService: CountryService,
    private reservationService: RoomReservationService,
    private facilityService: FacilityService,
    private viewportScroller: ViewportScroller,
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
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.hotels();
    this.getProperty();
    this.getRoomsByProperty();
    this.getCountries();
    this.getPropertyFacilities();
  }

  hotels() {
    const hotels = [
      {id: 1, img: '../assets/h2.jpg', title: 'Hotels', des: '123 hotels klkssdul d'},
      {id: 2, img: '../assets/h1.jpg', title: 'Apartments', des: '120 apartments'},
      {id: 3, img: '../assets/h3.jpg', title: 'Resorts', des: '100 resorts'},
      {id: 4, img: '../assets/h4.jpg', title: 'Villas', des: '123 villas'},
      {id: 5, img: '../assets/h5.jpg', title: 'Hotels', des: '123 hotels'},
      {id: 6, img: '../assets/h3.jpg', title: 'Apartments', des: '123 apartments'},
      {id: 6, img: '../assets/h2.jpg', title: 'Villas', des: '60 villas'}
    ];
    this.slides = hotels;
  }

  reserveRoomForm = this.formBuilder.group({
    checkIn: ['', [Validators.required]],
    checkOut: ['', [Validators.required]],
    totalPrice: ['', [Validators.required]],
    currency: [Currency.XAF, [Validators.required]],
    numberOfAdults: ['', [Validators.required]],
    numberOfChildren: [''],
    specialRequest: [''],
    arrivalTime: [''],
    contactDetailsPayload: this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
    }),
    reservationItemPayloadList: this.formBuilder.array([]),
  });

  reservationItemPayload(room: RoomDto, roomPrice: number, fullName: string, guestEmail: string): FormGroup {
    return this.formBuilder.group({
      roomId: [room?.id!, [Validators.required]],
      numberOfRooms: [this.roomPrice! / (room?.unitPrice! * this.diffDays), [Validators.required]],
      price: [roomPrice, [Validators.required]],
      currency: [Currency.XAF, [Validators.required]],
      fullGuestName: [fullName],
      guestEmail: [guestEmail],
    });
  }

  get reservationItemPayloadList() {
    return this.reserveRoomForm.get('reservationItemPayloadList') as FormArray;
  }

  addReservationItemPayload(event: any, room: RoomDto) {
    this.roomPrice = event.target.value;
    this.room = room;
    console.log(this.roomPrice! / (room?.unitPrice! * this.diffDays));
  }

  onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  getProperty() {
    const propertySub = this.propertyService.getProperty(this.propertyId).subscribe(response => {
      this.property = response;
    });
    this.subscriptions.push(propertySub);
  }

  getRoomsByProperty() {
    const roomsSub = this.roomService.getRoomsByProperty(this.propertyId).subscribe(response => {

      this.rooms = response.filter(res => res.numberOfRooms! > 0);
    });
    this.subscriptions.push(roomsSub);
  }

  getCheckIn(event: any) {
    this.checkIn = new Date(event.target.value);
  }

  getCheckOut(event: any) {
    this.checkOut = new Date(event.target.value);
  }

  checkAvailability() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    // @ts-ignore
    this.diffDays = Math.round(Math.abs((this.checkIn - this.checkOut) / oneDay));
    this.showTableField = true;
    this.showPrice = false;
  }

  numberOfRooms(i: number) {
    return new Array(i);
  }

  reservationClicked() {
    this.showHotel = false;
    this.showReservation = true;
  }

  checkRadioButton(event: any) {
    this.showGuestEmail = event.target.value === 'someone';
  }

  getCountries() {
    const countries = this.countryService.getCountries().subscribe(response => {
      this.countries = response;
    });
    this.subscriptions.push(countries);
  }

  addNumber(event: any) {
    if (event.target.value) {
      this.reservationItemPayloadList.push(this.reservationItemPayload(this.room!, this.roomPrice!, this.fullName, this.guestEmail));
    }
  }

  reserveRoom() {
    this.submitted = true;
    if (!this.reserveRoomForm.valid) {
      const message = 'please fill all fields in the form';
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const reserveRoomSub =this.reservationService.reserveRoom(this.propertyId, this.reserveRoomForm.value)
        .subscribe(response => {
         console.log(response);
          this.reference = response.ref;
          this.price = response.totalPrice;
          this.router.navigate(['/payment-page', this.price, this.reference]);
        });
      this.subscriptions.push(reserveRoomSub);
    }
  }

  // getReservation(reservationId: string): RoomReservationResponse{
  //   const reservationSub = this.reservationService.getReservation(reservationId).subscribe(response => {
  //     this.reservation = response;
  //     console.log(this.reservation);
  //
  //   });
  //   this.subscriptions.push(reservationSub);
  //   return this.reservation;
  // }

  getPropertyFacilities() {
    const propertyFacilitiesSub = this.facilityService.getFacilitiesByProperty(this.propertyId)
      .subscribe(response => {
        this.propertyFacilities = response;
      });
    this.subscriptions.push(propertyFacilitiesSub);
  }

}
