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
import {BasicInfoComponent} from "./pages/basic-info/basic-info.component";
import {LayoutPricingComponent} from "./pages/layout-pricing/layout-pricing.component";
import {FacilitiesServicesComponent} from "./pages/facilities-services/facilities-services.component";
import {AmenitiesComponent} from "./pages/amenities/amenities.component";
import {PhotosComponent} from "./pages/photos/photos.component";
import {PoliciesComponent} from "./pages/policies/policies.component";
import {PaymentsComponent} from "./pages/payments/payments.component";


const routes: Routes = [
  {
    path: '',
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
    path: 'basic-info',
    component: BasicInfoComponent,
  },
  {
    path: 'layout',
    component: LayoutPricingComponent
  },
  {
    path: 'facility',
    component: FacilitiesServicesComponent,
  },
  {
    path: 'amenity',
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
