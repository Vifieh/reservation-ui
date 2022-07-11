import { Component, OnInit } from '@angular/core';
import {RecommenderService} from '../../services/recommender-service/recommender.service';
import {Subscription} from 'rxjs';
import {HotelNameDto} from '../../model/dto/recommenderDto';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recommender-page',
  templateUrl: './recommender-page.component.html',
  styleUrls: ['./recommender-page.component.css']
})
export class RecommenderPageComponent implements OnInit {

  subscriptions: Subscription[] = [];
  response: any;
  hotelName: any[] = [];
  averageScore: any[] = [];
  hotelAddress: any[] = [];
  hotels: any[] = [];
  location?: string | null;
  description?: string | null;

  constructor(
    private recommenderService: RecommenderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getRecommendedHotel();
  }

  getRecommendedHotel() {
    this.location = this.route.snapshot.paramMap.get('location');
    this.description = this.route.snapshot.paramMap.get('description');

    const recommendSub = this.recommenderService.recommendHotel(this.location!, this.description!)
      .subscribe( response => {
        for (let res = 0; res <= response.Hotel_Name.length; res ++) {
          this.hotelName.push(response.Hotel_Name[res])
          this.averageScore.push(response.Average_Score[res]);
          this.hotelAddress.push(response.Hotel_Address[res]);
        }
        this.hotels = this.hotelName.map((name, i) => ({name, score: this.averageScore[i], address: this.hotelAddress[i]}))
        console.log(this.hotels);
      });
    this.subscriptions.push(recommendSub);
  }


}
