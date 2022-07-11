import { Component, OnInit } from '@angular/core';
import alanBtn from "@alan-ai/alan-sdk-web";

@Component({
  selector: 'app-voice-search',
  templateUrl: './voice-search.component.html',
  styleUrls: ['./voice-search.component.css']
})
export class VoiceSearchComponent implements OnInit {

  alanBtnInstance;

  constructor() {
    this.alanBtnInstance = alanBtn({
      key: '7cf975bf13e78e2dc7ff9085bdb975872e956eca572e1d8b807a3e2338fdd0dc/stage',
    });
  }

  ngOnInit(): void {
  }

}
