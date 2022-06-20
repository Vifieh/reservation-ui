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
import {CityDetailComponent} from './pages/city-detail/city-detail.component';
import {MapComponent} from './pages/map/map.component';
import {ListPropertyRegisterComponent} from './pages/list-property-register/list-property-register.component';
import {ListPropertyLoginComponent} from './pages/list-property-login/list-property-login.component';
import {MyPropertiesComponent} from './pages/my-properties/my-properties.component';
import {PropertyDetailsComponent} from './pages/property-details/property-details.component';
import {ListPropertyCompletionComponent} from './pages/list-property-completion/list-property-completion.component';


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
    path: 'list-property-login',
    component: ListPropertyLoginComponent,
  },

  {
    path: 'list-property-register',
    component: ListPropertyRegisterComponent,
  },

  {
    path: 'list-property-completion/:id',
    component: ListPropertyCompletionComponent,
  },

  {
    path: 'my-properties',
    component: MyPropertiesComponent,
  },

  {
    path: 'property-details/:id',
    component: PropertyDetailsComponent,
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
    path: 'layouts/:id',
    component: LayoutPricingComponent
  },
  {
    path: 'facilities/:id',
    component: FacilitiesServicesComponent,
  },
  {
    path: 'amenities/:id',
    component: AmenitiesComponent,
  },
  {
    path: 'photos/:id',
    component: PhotosComponent,
  },
  {
    path: 'policies/:id',
    component: PoliciesComponent,
  },
  {
    path: 'payments/:id',
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
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'property-landing-Page',
    component: PropertyLandingPageComponent,
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
