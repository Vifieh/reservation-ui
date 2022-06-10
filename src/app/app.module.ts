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
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CountryComponent } from './pages/country/country.component';
import { CityComponent } from './pages/city/city.component';
import { CategoryAmenityComponent } from './pages/category-amenity/category-amenity.component';
import { PropertyDashboardComponent } from './pages/property-dashboard/property-dashboard.component';
import {PropertyTypeComponent} from './pages/property-type/property-type.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ListPropertyComponent } from './pages/list-property/list-property.component';
import { ListPropertyNavbarComponent } from './pages/list-property/list-property-navbar/list-property-navbar.component';
import { BasicInfoComponent } from './pages/basic-info/basic-info.component';
import { LayoutPricingComponent } from './pages/layout-pricing/layout-pricing.component';
import { FacilitiesServicesComponent } from './pages/facilities-services/facilities-services.component';
import { AmenitiesComponent } from './pages/amenities/amenities.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AmenityComponent } from './pages/amenity/amenity.component';
import { CityDetailComponent } from './pages/city-detail/city-detail.component';
import { MapComponent } from './pages/map/map.component';
import { EnumToArrayPipe } from './pipes/enum-to-array/enum-to-array.pipe';


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
    AdminDashboardComponent,
    CountryComponent,
    CityComponent,
    CategoryAmenityComponent,
    PropertyDashboardComponent,
    PropertyTypeComponent,
    PageNotFoundComponent,
    ListPropertyComponent,
    ListPropertyNavbarComponent,
    BasicInfoComponent,
    LayoutPricingComponent,
    FacilitiesServicesComponent,
    AmenitiesComponent,
    PhotosComponent,
    PoliciesComponent,
    PaymentsComponent,
    AmenityComponent,
    CityDetailComponent,
    MapComponent,
    EnumToArrayPipe,
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
    BrowserAnimationsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
