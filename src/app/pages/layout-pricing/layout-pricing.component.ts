import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-pricing',
  templateUrl: './layout-pricing.component.html',
  styleUrls: ['./layout-pricing.component.css']
})
export class LayoutPricingComponent implements OnInit {
isShow: boolean= false;
room:string ='';
isViewRoom:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  isCheck()
  {
    this.isShow = true;
    this.isViewRoom = false;
  }

  viewRoom()
  {
    this.isViewRoom = true;

  }

}
