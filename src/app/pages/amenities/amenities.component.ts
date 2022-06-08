import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit {
  isShow = false;

  constructor() { }

  ngOnInit(): void {
  }
  showText() {
    this.isShow = !this.isShow
  }

}
