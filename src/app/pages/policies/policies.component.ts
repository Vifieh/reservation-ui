import { Component, OnInit } from '@angular/core';
import {Default} from '../../enum/default';
import {Status} from '../../enum/status';
import {PropertyService} from '../../services/property-service/property.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {Subscription} from 'rxjs';
import {NotificationType} from '../../model/notificationMessage';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  days: string[] = ['Day arrival (18:00)', '1 day', '2 days', '3 days', '7 days', '14 days'];
  pays: string[] = ['of the first night', 'of the full stay'];
  petsAllowed = [
    {key: Default.NO, value: 'No'},
    {key: Default.YES, value: 'Yes'},
    {key: Default.UPON_REQUEST, value: 'Upon Request'},
  ];
  charges = [
    {key: Status.FREE, value: 'Pets can stay for free'},
    {key: Status.PAID, value: 'Charges may apply'},
  ];
  checkInFromSelect: string[] = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
                                 '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
                                  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];
  checkInToSelect: string[] = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
                                '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                                '21:00', '21:30', '22:20', '22:30', '23:00', '23:30', '00:00'];
  checkOutFromSelect: string[] = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
                                  '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '7:00', '7:30', '8:00',
                                  '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
  isDisplayed: boolean = false;
  submitted: boolean = false;
  propertyId?: string | null;
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
    this.propertyId = this.route.snapshot.paramMap.get('id');
  }

  addPolicyForm = this.formBuilder.group({
    guestCanCancel: ['', [Validators.required]],
    guestPay: ['', [Validators.required]],
    checkInFrom: ['', [Validators.required]],
    checkInTo: ['', [Validators.required]],
    checkOutFrom: [''],
    checkOutTo: ['', [Validators.required]],
    canAccommodateChildren: ['', [Validators.required]],
    petPayload: this.formBuilder.group({
      allowPets: [''],
      charge: [Status.FREE],
    }),
  });


  checkStatus(event: any) {
    this.isDisplayed = event.target.value !== 'NO';
  }

  addPolicy() {
    this.submitted = true;
    if (!this.addPolicyForm.valid) {
      const message = 'please fill all fields in the form';
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const addPolicySub = this.propertyService.addPolicy(this.propertyId, this.addPolicyForm.value)
        .subscribe(response => {
          this.router.navigate(['/payments', this.propertyId]);
        });
      this.subscriptions.push(addPolicySub);
    }
  }

}
