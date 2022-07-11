import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {Subscription} from 'rxjs';
import {RoomReservationService} from '../../services/room-reservation-service/room-reservation.service';
import {RoomReservationDto} from '../../model/dto/roomReservationDto';

@Component({
  selector: 'app-property-reservations-page',
  templateUrl: './property-reservations-page.component.html',
  styleUrls: ['./property-reservations-page.component.css']
})
export class PropertyReservationsPageComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  reservations: RoomReservationDto[] = [];
  propertyId?: string | null;

  constructor(
    private reservationService: RoomReservationService,
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
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.getReservationsByProperty();
  }

  getReservationsByProperty() {
    const reservationSub = this.reservationService.getReservationsByProperty(this.propertyId, false)
      .subscribe(response => {
        this.reservations = response;
        console.log(this.reservations);
      });
    this.subscriptions.push(reservationSub);
  }

}
