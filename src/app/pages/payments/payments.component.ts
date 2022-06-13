import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  isDisplayed: boolean = false;
  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  checkRadioButton(event: any) {
    this.isDisplayed = event.target.value !== 'no';
  }
}
