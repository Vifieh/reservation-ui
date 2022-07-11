import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-payment-modal-page',
  templateUrl: './payment-modal-page.component.html',
  styleUrls: ['./payment-modal-page.component.css']
})
export class PaymentModalPageComponent implements OnInit {

  zitopayUrl = environment.zitopayBaseUrl;
  notification_url = environment.notification_url;
  success_url = environment.success_url;
  cancel_url = environment.cancel_url;
  url!: SafeResourceUrl;
  @Input() price: number = 0;
  @Input() reference: string = '';
  // price=5000;
  // reference=1233444;
  show: boolean = false;

  constructor(
    public sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    // this.reference = this.navParams.get('payments');
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.zitopayUrl + '&amount=' + this.price! + '&receiver=kelson'
      + '&notification_url=' + this.notification_url + '&ref=' +
      this.reference! + '&success_url=' + this.success_url +
      '&cancel_url=' + this.cancel_url
    );
    console.log(this.price!);
    console.log(this.reference!);
  }

}
