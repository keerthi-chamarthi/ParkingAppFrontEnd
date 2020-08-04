import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { AddressComponent } from './pages/address/address.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CustomerProfileComponent,
    HomeComponent,
    AdminProfileComponent,
    AddressComponent,
    SearchpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
