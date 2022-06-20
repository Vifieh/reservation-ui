import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CustomDto} from '../../model/dto/customDto';
import {PaymentOptionService} from '../../services/payment-option-service/payment-option.service';
import {PropertyService} from '../../services/property-service/property.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {NotificationType} from '../../model/notificationMessage';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  isDisplayed: boolean = false;
  submitted: boolean = false;
  subscriptions: Subscription[] = [];
  paymentOptions: CustomDto[] = [];
  propertyId?: string | null;

  constructor(
    private paymentOptionService: PaymentOptionService,
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
    this.getPaymentOptions();
    this.propertyId = this.route.snapshot.paramMap.get('id');
  }

  addPaymentOptionsForm = this.formBuilder.group({
    paymentOptionsPayload: this.formBuilder.array([])
  })

  customPayload(name: string): FormGroup {
    return this.formBuilder.group({
      name: [name],
    });
  }

  onChangePaymentOption(event: any) {
    const paymentOptionsPayload: FormArray = this.addPaymentOptionsForm.get('paymentOptionsPayload') as FormArray;
    const paymentOptionName = event.target.value;
    if (event.target.checked) {
      paymentOptionsPayload.push(this.customPayload(paymentOptionName));
    } else {
      const index = paymentOptionsPayload.controls.findIndex(x => x.value === paymentOptionName);
      paymentOptionsPayload.removeAt(index);
    }
  }

  checkRadioButton(event: any) {
    this.isDisplayed = event.target.value !== 'no';
  }

  getPaymentOptions() {
    const paymentOptions = this.paymentOptionService.getPaymentOptions().subscribe(response => {
      this.paymentOptions = response;
    });
    this.subscriptions.push(paymentOptions);
  }

  addPaymentOptions() {
    this.submitted = true;
    if (!this.addPaymentOptionsForm.valid) {
      const message = 'please fill all fields in the form';
      this.notificationService.sendMessage({message: message, type: NotificationType.info});
    } else {
      const addPaymentOptionsSub = this.propertyService.addPaymentOptions(this.propertyId, this.addPaymentOptionsForm.value)
        .subscribe(response => {
          this.router.navigate(['/list-property-completion', this.propertyId]);
        });
      this.subscriptions.push(addPaymentOptionsSub);
    }
    }

}
