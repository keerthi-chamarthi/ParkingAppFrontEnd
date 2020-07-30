import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  closeResult = '';
  isLoggedIn = true;
  constructor(private modalService: NgbModal,private router:Router) {
    if(localStorage.getItem("token")!=null){
      this.isLoggedIn = false;
    }
   }

  ngOnInit(): void {
    if(localStorage.getItem("token")!=null){
      this.isLoggedIn = false;
    }
  }
  
  open() {
    const modalRef = this.modalService.open(LoginComponent);
  }

  logout(){
    localStorage.removeItem("token");
    this.isLoggedIn = true;
  }
}