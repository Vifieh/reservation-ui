import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {RoomTypeService} from '../../services/room-type-service/room-type.service';
import {CustomDto} from '../../model/dto/customDto';
import {RoomNameService} from '../../services/room-name-service/room-name.service';
import {Policy} from '../../enum/policy';
import {BedAvailableService} from '../../services/bed-available-service/bed-available.service';
import {Size} from '../../enum/size';
import {Currency} from '../../enum/currency';

@Component({
  selector: 'app-layout-pricing',
  templateUrl: './layout-pricing.component.html',
  styleUrls: ['./layout-pricing.component.css']
})
export class LayoutPricingComponent implements OnInit, OnDestroy {

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
  isShow: boolean = false;
  isDisplayed: boolean = false;
  room: string = '';
  subscriptions: Subscription[] = [];
  roomTypes: CustomDto[] = [];
  roomNames: CustomDto[] = [];
  bedsAvailable: CustomDto[] = [];
room:string ='';
isViewRoom:boolean = false;

  constructor(
    private roomTypeService: RoomTypeService,
    private roomNameService: RoomNameService,
    private bedAvailableService: BedAvailableService,
  ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getRoomTypes();
    this.getBedAvailable();
  }

  isCheck() {
    this.isShow = true;
    this.isViewRoom = false;
  }

  viewRoom()
  {
    this.isViewRoom = true;

  }

  getRoomTypes() {
    const roomTypes = this.roomTypeService.getRoomTypes().subscribe(response => {
      this.roomTypes = response;
    });
    this.subscriptions.push(roomTypes);
  }

  roomTypeChanged(event: any) {
    const roomTypeId = event.target.value;
    this.getRoomNameByRoomType(roomTypeId);
    this.isDisplayed = event.target.value !== 'null';
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


}
