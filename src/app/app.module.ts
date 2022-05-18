import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {LandingPageNavbarComponent} from "./components/landing-page-navbar/landing-page-navbar.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastContainerModule, ToastrModule} from "ngx-toastr";
import {AuthInterceptorService} from "./interceptors/auth-interceptor.service";
import { PropertyLandingPageComponent } from './pages/property-landing-page/property-landing-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    LandingPageComponent,
    SidebarComponent,
    LandingPageNavbarComponent,
    PropertyLandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      tapToDismiss: false,
      positionClass: 'toast-top-full-width',
      preventDuplicates: false
    }),
    ToastContainerModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
