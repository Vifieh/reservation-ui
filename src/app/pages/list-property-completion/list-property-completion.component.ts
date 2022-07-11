import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyService} from '../../services/property-service/property.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {Subscription} from 'rxjs';
import {PropertyDto} from '../../model/dto/propertyDto';
import {NotificationType} from '../../model/notificationMessage';

@Component({
  selector: 'app-list-property-completion',
  templateUrl: './list-property-completion.component.html',
  styleUrls: ['./list-property-completion.component.css']
})
export class ListPropertyCompletionComponent implements OnInit, OnDestroy {

  submit: boolean = true;
  propertyId?: string | null;
  subscriptions: Subscription[] = [];
  property?: PropertyDto;
  propertyName?: string;

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
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.getProperty();
  }

  getProperty()  {
    const propertySub = this.propertyService.getProperty(this.propertyId).subscribe(response => {
      this.property = response;
      this.propertyName = this.property.name;
    });
    this.subscriptions.push(propertySub);
  }

  completeRegistration() {
    const completeRegistrationSub = this.propertyService.completeRegistration(this.propertyId, null)
      .subscribe(response => {
        this.notificationService.sendMessage({message: response.message, type: NotificationType.success});
        this.router.navigate(['/my-properties']);
      })
  }



}
