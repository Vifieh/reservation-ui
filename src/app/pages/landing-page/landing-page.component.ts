import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  customOptions:OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ["<<",">>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 6
      },
      1000: {
        items: 6
      }
    },
    nav: true
  }

  slides:any[]=[];



  constructor() { }

  ngOnInit(): void {
    this.hotels()

  }
  hotels()
  {
   const hotels = [
      {id: 1, img: "../assets/h2.jpg", title: "Hotels", des: "123 hotels"},
      {id: 2, img: "../assets/h1.jpg", title: "Apartments", des: "120 apartments"},
      {id: 3, img:  "../assets/h3.jpg", title: "Resorts", des:"100 resorts"},
      {id: 4, img:  "../assets/h4.jpg", title: "Villas", des: "123 villas"},
      {id: 5, img:  "../assets/h5.jpg", title: "Hotels", des: "123 hotels"},
      {id: 6, img:  "../assets/h3.jpg", title: "Apartments", des: "123 apartments"},
      {id: 6, img:  "../assets/h2.jpg", title: "Villas", des: "60 villas"}
    ];
   this.slides=hotels;
  }



}
