import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-pricing',
  templateUrl: './layout-pricing.component.html',
  styleUrls: ['./layout-pricing.component.css']
})
export class LayoutPricingComponent implements OnInit {
isShow: boolean= false;
room:string ='';
  constructor() { }

  ngOnInit(): void {
  }

  isCheck()
  {
    this.isShow = true;
  }

}
