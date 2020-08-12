import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookingResponse } from '../../models/customer/responses/booking.response.model';
import { SearchpageComponent } from '../searchpage/searchpage.component';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  isLoggedIn: boolean;
  isbooked: boolean = false;
  bookingdata:any;
  ticketdata:BookingResponse;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  showBooking(event:any):void{
    //console.log(event);
    this.isbooked=true;
    this.bookingdata=event;
    console.log(this.bookingdata);
  }
}
