import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.scss']
})
export class BookingpageComponent implements OnInit {
  @Input() public addressid;
  @Input() public slot;
  bookingform:FormGroup
  constructor(public activeModal: NgbActiveModal,public fb:FormBuilder,private customer:CustomerService) { }

  ngOnInit(): void {
    this.bookingform = this.fb.group({
      vnumber: ['',Validators.required],
      vtype : ['',Validators.required]
    })
    console.log(this.addressid);
  }

  onSubmit(bookingdata){
    bookingdata["addressid"]=this.addressid;
    bookingdata["sessiontoken"]=localStorage.getItem("token");
    bookingdata["slot"]=this.slot;
    console.log(bookingdata);
    this.customer.booksite(bookingdata);
  }
}
