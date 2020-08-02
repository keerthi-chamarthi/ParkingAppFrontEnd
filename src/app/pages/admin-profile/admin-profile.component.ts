import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  justloggedin = true;
  constructor() { }

  ngOnInit(): void {
  }

  addSite(){
    this.justloggedin=false;
  }
}
