import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

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
  price!: string | null;
  reference!: string | null;
  // price=5000;
  // reference=1233444;
  show: boolean = false;

  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.reference = this.route.snapshot.paramMap.get('ref');
    this.price = this.route.snapshot.paramMap.get('price');

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.zitopayUrl + '&amount=' + this.price + '&receiver=kelson'
      + '&notification_url=' + this.notification_url + '&ref=' +
      this.reference + '&success_url=' + this.success_url +
      '&cancel_url=' + this.cancel_url
    );
    console.log(this.price!);
    console.log(this.reference!);
  }

}
