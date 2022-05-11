import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/storage/local-storage.service";

@Component({
  selector: 'app-landing-page-navbar',
  templateUrl: './landing-page-navbar.component.html',
  styleUrls: ['./landing-page-navbar.component.css']
})
export class LandingPageNavbarComponent implements OnInit {

  loginCheck: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkLoginInfo()
  }

  checkLoginInfo() {
    if (localStorage.getItem('data') === null) {
      this.loginCheck = true;
    }
  }

}
