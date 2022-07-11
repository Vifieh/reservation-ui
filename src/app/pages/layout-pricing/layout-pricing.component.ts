import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {RoomTypeService} from '../../services/room-type-service/room-type.service';
import {CustomDto} from '../../model/dto/customDto';
import {RoomNameService} from '../../services/room-name-service/room-name.service';
import {Policy} from '../../enum/policy';
import {BedAvailableService} from '../../services/bed-available-service/bed-available.service';
import {Size} from '../../enum/size';
import {Currency} from '../../enum/currency';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../services/room-service/room.service';
import {NotificationType} from '../../model/notificationMessage';
import {NotificationService} from '../../services/notification/notification.service';
import {RoomDto} from '../../model/dto/roomDto';
import {EmitService} from '../../services/emit-service/emit.service';

@Component({
  selector: 'app-layout-pricing',
  templateUrl: './layout-pricing.component.html',
  styleUrls: ['./layout-pricing.component.css']
})
export class LayoutPricingComponent implements OnInit, OnDestroy {

  submitted: boolean = false;
  isShow: boolean = false;
  isDisplayed: boolean = false;
  isBedOption: boolean = false;
  isViewRoom: boolean = false;
  showDelete: boolean = false;
  showListOfRooms: boolean = false;
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  smokingPolicies = [
    {key: Policy.NO, value: 'Non-smoking'},
    {key: Policy.YES, value: 'Smoking'},
    {key: Policy.BOTH, value: 'I have both smoking and non-smoking options for this room type'}
  ];
  roomSizes = [
    {key: Size.SQUARE_METRES, value: 'square metres'},
    {key: Size.SQUARE_FEET, value: 'square feet'}
  ];
  currencies = Currency;
  room: string = '';
  subscriptions: Subscription[] = [];
  roomTypes: CustomDto[] = [];
  roomNames: CustomDto[] = [];
  bedsAvailable: CustomDto[] = [];
  rooms: RoomDto[] = [];
  propertyId?: string | null;

  constructor(
    private roomTypeService: RoomTypeService,
    private roomNameService: RoomNameService,
    private bedAvailableService: BedAvailableService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private emitService: EmitService,
  ) {
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getRoomTypes();
    this.getBedAvailable();
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.getRoomsByPropertyId(this.propertyId);
    this.emitService.eventEmitter.emit(this.propertyId);
  }

  createRoomForm = this.formBuilder.group({
    name: [''],
    numberOfRooms: ['1', [Validators.required]],
    smokingPolicy: ['', [Validators.required]],
    roomSize: [''],
    unitPrice: ['', [Validators.required]],
    numberOfGuests: ['1'],
    currency: ['', [Validators.required]],
    size: [''],
    roomNameId: ['', [Validators.required]],
    roomBedAvailablePayloadList: this.formBuilder.array([
      this.bedAvailableItems(),
    ]),
  });

  get formValues(): { [key: string]: AbstractControl } {
    return this.createRoomForm.controls;
  }

  bedAvailableItems(): FormGroup {
    return this.formBuilder.group({
      bedAvailableId: [''],
      numberOfBeds: ['1'],
    });
  }

  get roomBedAvailablePayloadList() {
    return this.createRoomForm.get('roomBedAvailablePayloadList') as FormArray;
  }

  addBedAvailable() {
    this.roomBedAvailablePayloadList.push(this.bedAvailableItems());
    this.showDelete = true;
  }

  deleteBedAvailable(bedAvailableIndex: number) {
    this.roomBedAvailablePayloadList.removeAt(bedAvailableIndex);
  }

  isCheck() {
    this.isViewRoom = true;
    this.isShow = true;
  }

  viewRoom() {
    this.isViewRoom = false;
    this.showListOfRooms = true;
  }

  addAnotherRoom() {
    this.isViewRoom = true;
    this.showListOfRooms = false;
  }

  goBackToOverview() {
    this.isViewRoom = false;
    this.showListOfRooms = true;
  }

  roomTypeChanged(event: any) {
    this.isBedOption = event.target.value !== '25ffbd72-0ff9-49f1-aaa1-3d1e828019e0';
    const roomTypeId = event.target.value;
    this.getRoomNameByRoomType(roomTypeId);
    this.isDisplayed = event.target.value !== 'null';
  }

  getRoomTypes() {
    const roomTypes = this.roomTypeService.getRoomTypes().subscribe(response => {
      this.roomTypes = response;
    });
    this.subscriptions.push(roomTypes);
  }

  getRoomNameByRoomType(roomTypeId: string) {
    const roomNames = this.roomNameService.getRoomNamesByRoomType(roomTypeId).subscribe(response => {
      this.roomNames = response;
    });
    this.subscriptions.push(roomNames);
  }

  getBedAvailable() {
    const bedsAvailable = this.bedAvailableService.getBedsAvailable().subscribe(response => {
      this.bedsAvailable = response;
    });
    this.subscriptions.push(bedsAvailable);
  }

  creatRoom() {
    this.submitted = true;
    if (!this.createRoomForm.valid) {
      const message = 'please fill all fields in the form';
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const createRoomSub = this.roomService.createRoom(this.propertyId, this.createRoomForm.value)
        .subscribe(response => {
          this.viewRoom();
        });
      this.subscriptions.push(createRoomSub);
    }
  }

  continue() {
    this.router.navigate(['/facilities', this.propertyId]);
  }

  getRoomsByPropertyId(propertyId?: string | null) {
    const roomsSub = this.roomService.getRoomsByProperty(propertyId).subscribe(response => {
      this.rooms = response;
      if (this.rooms.length !== 0) {
        this.showListOfRooms = true;
        this.isShow = true;
      }
    });
    this.subscriptions.push(roomsSub);
  }

}
