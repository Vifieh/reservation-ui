import {Component, OnDestroy, OnInit} from '@angular/core';
import alanBtn from "@alan-ai/alan-sdk-web";
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../services/notification/notification.service';
import {CityService} from '../../services/city-service/city.service';
import {CityDto} from '../../model/dto/cityDto';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {VoiceRecognitionService} from '../../services/voice-recognition-service/voice-recognition.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<<', '>>'],
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
  };

  subscriptions: Subscription[] = [];
  cities: CityDto[] = [];
  city?: CityDto;
  location?: string;
  description?: string;
  isUserSpeaking: boolean = false;
  alanBtnInstance;

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private voiceRecognitionService: VoiceRecognitionService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.alanBtnInstance = alanBtn({
      key: '7cf975bf13e78e2dc7ff9085bdb975872e956eca572e1d8b807a3e2338fdd0dc/stage',
    });
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getCities();
    this.initVoiceInput();
  }

  searchForm = this.formBuilder.group({
    searchText: ['', Validators.required],
  });


  getCities() {
    const citiesSub = this.cityService.getCities().subscribe(response => {
      this.cities = response;
    });
    this.subscriptions.push(citiesSub);
  }

  getCityByName(cityName: string | undefined) {
    const citiesSub = this.cityService.getCityByName(cityName).subscribe(response => {
      this.city = response;
      console.log(this.city);
    });
    this.subscriptions.push(citiesSub);
  }

  searchData() {
    this.router.navigate(['/recommender', this.location, this.description]);
  }

  /**
   * @description Function to stop recording.
   */
  stopRecording() {
    this.voiceRecognitionService.stop();
    this.isUserSpeaking = false;
  }

  /**
   * @description Function for initializing voice input so user can chat with machine.
   */
  initVoiceInput() {
    // Subscription for initializing and this will call when user stopped speaking.
    this.voiceRecognitionService.init().subscribe(() => {
      // User has stopped recording
      // Do whatever when mic finished listening
      this.getCityByName(this.transform(this.searchForm.value.searchText));
      this.router.navigate(['/city-detail', this.city?.id]);

      console.log(this.searchForm.value.searchText);
    });

    // Subscription to detect user input from voice to text.
    this.voiceRecognitionService.speechInput().subscribe((input) => {
      // Set voice text output to
      // Set voice text output to
      this.searchForm.controls['searchText'].setValue(input);
    });
  }

  /**
   * @description Function to enable voice input.
   */
  startRecording() {
    this.isUserSpeaking = true;
    this.voiceRecognitionService.start();
    this.searchForm.controls['searchText'].reset();
  }

  transform(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
