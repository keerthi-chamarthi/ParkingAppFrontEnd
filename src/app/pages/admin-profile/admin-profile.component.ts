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
   }

  ngOnInit(): void {
    this.justloggedin=true;
    this.sites= JSON.parse(localStorage.getItem("sites"));
    console.log(this.sites);
    this.checkStatus();
  }

  addSite(){
    this.justloggedin=false;
  }

  public viewSite(event:string):void {
    this.sites= JSON.parse(localStorage.getItem("sites"));
    console.log(this.sites);
    this.checkStatus();
    this.justloggedin = true;
    console.log('Submitted');
  }

  checkStatus(){
    for(let i=0;i<this.sites.length;i++){
      if(this.sites[i].bookingstatus==null){
        this.sites[i].bookingstatus="NOT BOOKED";
      }
    }
  }
}
