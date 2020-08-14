import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() public starttime;
  @Input() public endtime;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  bookingform:FormGroup;
  bookingdata;
  bookingrequestdata = {};
  constructor(public activeModal: NgbActiveModal,public fb:FormBuilder,private customer:CustomerService) { }

  ngOnInit(): void {
    this.bookingform = this.fb.group({
      vnumber: ['',Validators.required],
      vtype : ['',Validators.required]
    })
    console.log(this.addressid);
  }

  async onSubmit(bookingdata){
    bookingdata["addressid"]=this.addressid;
    bookingdata["starttime"]=this.starttime;
    bookingdata["endtime"]=this.endtime;
    this.bookingrequestdata["booking"]=bookingdata;
    this.bookingrequestdata["sessiontoken"]=localStorage.getItem("token");
    console.log(bookingdata);
    this.bookingdata = await this.customer.booksite(this.bookingrequestdata);
    this.passBack();
    this.activeModal.close();
  }

  passBack() 
  {
    this.passEntry.emit(this.bookingdata);
  }
}
