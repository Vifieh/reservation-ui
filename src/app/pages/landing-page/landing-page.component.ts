import {Component, OnDestroy, OnInit} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {Subscription} from 'rxjs';
import {CustomDto} from '../../model/dto/customDto';
import {CountryService} from '../../services/country-service/country.service';
import {NotificationService} from '../../services/notification/notification.service';
import {CityService} from '../../services/city-service/city.service';
import {FileService} from '../../services/file-service/file.service';
import {FileInfoDto} from '../../model/dto/fileInfoDto';
import {CityDto} from '../../model/dto/cityDto';
import {PropertyAddressDto} from '../../model/dto/propertyDto';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
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

  subscriptions: Subscription[] = [];
  cities: CityDto[] = [];
  cityId?: string;
  city?: CustomDto;

  constructor(
    private cityService: CityService,
    private fileService: FileService,
    private notificationService: NotificationService,
  ) { }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    const citiesSub =  this.cityService.getCities().subscribe(response => {
      this.cities = response;
      console.log(this.cities);
    });
    this.subscriptions.push(citiesSub);
  }

}
