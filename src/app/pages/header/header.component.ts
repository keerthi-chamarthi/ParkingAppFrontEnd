import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  closeResult = '';
  isLoggedIn = true;
  message:string;
  constructor(private modalService: NgbModal,private router:Router,private admin:AdminService) {
    if(localStorage.getItem("token")!=null){
      this.isLoggedIn = false;
    }
   }

  ngOnInit(): void {
    if(localStorage.getItem("token")!=null){
      this.isLoggedIn = false;
    }
  }
  

  async logout(){
    
    if(localStorage.getItem("admintoken")!=null){
      await this.admin.logout(localStorage.getItem("admintoken"));
      localStorage.clear();
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }

    // else if(localStorage.getItem("token")!=null){
    //   let message = await this.admin.logout(localStorage.getItem("token"));
    //   if(message=="Logged out"){
    //     localStorage.removeItem("token");
    //     this.isLoggedIn = true;
    //     this.router.navigate(['/home']);
    //   }
    // }
  }
}
