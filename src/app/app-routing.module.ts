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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
