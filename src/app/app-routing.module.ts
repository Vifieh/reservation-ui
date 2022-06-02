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
import {CategoryAmenityComponent} from './pages/category-amenity/category-amenity.component';
import {AmenityComponent} from './pages/amenity/amenity.component';


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
    path: 'amenity-type',
    component: CategoryAmenityComponent,
  },

  {
    path: 'amenity',
    component: AmenityComponent,
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
