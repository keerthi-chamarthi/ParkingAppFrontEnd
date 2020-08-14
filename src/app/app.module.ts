import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { AddressComponent } from './pages/address/address.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import { CustomerService } from './services/customer.service';
import { AdminService } from './services/admin.service';
import { BookingpageComponent } from './pages/bookingpage/bookingpage.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CustomerProfileComponent,
    HomeComponent,
    AdminProfileComponent,
    AddressComponent,
    SearchpageComponent,
    BookingpageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [CustomerService,AdminService],
  entryComponents: [
    LoginComponent,
    BookingpageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
