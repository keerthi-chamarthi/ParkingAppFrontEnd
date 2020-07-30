import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
  

  logout(){
    localStorage.removeItem("token");
    this.isLoggedIn = true;
    this.router.navigate(['/home']);
  }
}
