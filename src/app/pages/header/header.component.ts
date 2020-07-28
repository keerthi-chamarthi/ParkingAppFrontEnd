import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  closeResult = '';


  constructor(private modalService: NgbModal) {
   }

  ngOnInit(): void {
  }
  
  open() {
    const modalRef = this.modalService.open(LoginComponent);
  }
}
