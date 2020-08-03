import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { AddressComponent } from './pages/address/address.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  {path: 'profile', component: CustomerProfileComponent},
  { path: 'response',
    component: AdminProfileComponent,
    children:[
      {path:'addressform',component:AddressComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
