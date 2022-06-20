import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyService} from '../../services/property-service/property.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-property-completion',
  templateUrl: './list-property-completion.component.html',
  styleUrls: ['./list-property-completion.component.css']
})
export class ListPropertyCompletionComponent implements OnInit, OnDestroy {

  submit: boolean = true;
  propertyId?: string;
  subscriptions: Subscription[] = [];

  constructor(
    private propertyService: PropertyService,
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
  }

  getProperty(propertyId: string)  {

  }

}
