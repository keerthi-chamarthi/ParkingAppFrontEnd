import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Address} from '../../models/admin/responses/address.model';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  sites:any;
  justloggedin = true;
  status:any;
  constructor(private router:Router) {
    this.sites= JSON.parse(localStorage.getItem("sites"));
    console.log(this.sites);
   }

  ngOnInit(): void {
    this.justloggedin=true;
  }

  addSite(){
    this.justloggedin=false;
  }

  public viewSite(event:string):void {
    this.justloggedin = true;
    console.log('Submitted');
}
}
