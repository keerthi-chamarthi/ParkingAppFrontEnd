import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { AddressComponent } from './pages/address/address.component';
import {CustomerauthGuard} from './guards/customerauth.guard';
import { CheckGuard } from './guards/check.guard';
import { AdminauthGuard } from './guards/adminauth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent ,canActivate:[CheckGuard]},
  {path: 'profile', component: CustomerProfileComponent , canActivate:[CustomerauthGuard]},
  { path: 'response',component: AdminProfileComponent , canActivate: [AdminauthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
