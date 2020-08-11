import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  isLoggedIn: boolean;
  isbooked: boolean = false;
  bookingdata:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  booking(event:any):void{
    this.isbooked=true;
    this.bookingdata=event;
    console.log(this.bookingdata);
  }
}
