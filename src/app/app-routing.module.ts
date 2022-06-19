import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {PropertyLandingPageComponent} from './pages/property-landing-page/property-landing-page.component';
import {AuthorizeGuard} from './guards/authentication/authorize.guard';
import {AdminDashboardComponent} from './pages/admin-dashboard/admin-dashboard.component';
import {CountryComponent} from './pages/country/country.component';
import {CityComponent} from './pages/city/city.component';
import {PropertyDashboardComponent} from './pages/property-dashboard/property-dashboard.component';
import {PropertyTypeComponent} from './pages/property-type/property-type.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ListPropertyComponent} from './pages/list-property/list-property.component';
import {BasicInfoComponent} from './pages/basic-info/basic-info.component';
import {LayoutPricingComponent} from './pages/layout-pricing/layout-pricing.component';
import {FacilitiesServicesComponent} from './pages/facilities-services/facilities-services.component';
import {AmenitiesComponent} from './pages/amenities/amenities.component';
import {PhotosComponent} from './pages/photos/photos.component';
import {PoliciesComponent} from './pages/policies/policies.component';
import {PaymentsComponent} from './pages/payments/payments.component';
import {CategoryAmenityComponent} from './pages/category-amenity/category-amenity.component';
import {AmenityComponent} from './pages/amenity/amenity.component';
import {CityDetailComponent} from "./pages/city-detail/city-detail.component";
import {SingleHotelComponent} from "./pages/single-hotel/single-hotel.component";
import {MapComponent} from './pages/map/map.component';
import { HomeLandingPageComponent } from './pages/home-landing-page/home-landing-page.component';




const routes: Routes = [
  {
    path: 'landing-Page',
    component: LandingPageComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'landing-page',
    component: LandingPageComponent
  },

  {
    path: 'property',
    canActivate: [AuthorizeGuard],
    component: PropertyLandingPageComponent
  },

  {
    path: 'property-dashboard',
    component: PropertyDashboardComponent,
  },

  {
    path: 'property-type',
    component: PropertyTypeComponent,
  },

  {
    path: 'list-property',
    component: ListPropertyComponent,
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },

  {
    path: 'countries',
    component: CountryComponent,
  },

  {
    path: 'cities',
    component: CityComponent,
  },
  {

    path: 'city-detail',
    component: CityDetailComponent,
  },
  {
    path: 'basic-info/:id',
    component: BasicInfoComponent,
  },
  {
    path: 'layout/:id',
    component: LayoutPricingComponent
  },
  {
    path: 'facility/:id',
    component: FacilitiesServicesComponent,
  },
  {
    path: 'amenities/:id',
    component: AmenitiesComponent,
  },
  {
    path: 'photo',
    component: PhotosComponent,
  },
  {
    path: 'policy',
    component: PoliciesComponent,
  },
  {
    path: 'payment',
    component: PaymentsComponent,
  },

  {
    path: 'amenity-type',
    component: CategoryAmenityComponent,
  },

  {
    path: 'amenity',
    component: AmenityComponent,
  },

  {

    path: 'single-hotel',
    component: SingleHotelComponent,
  },
  {

    path: 'map',
    component: MapComponent,
  },
  {
    path: '',
    component: HomeLandingPageComponent,
  },

  {
    path: '**',
    component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
