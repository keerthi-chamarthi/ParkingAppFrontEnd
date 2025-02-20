import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { AddressRequestModel } from 'src/app/models/admin/requests';
import { NgbActiveModal, NgbModal ,NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import { BookingpageComponent } from '../bookingpage/bookingpage.component';
import { LoginComponent } from '../login/login.component';
import {formatDate} from '@angular/common';
import { BookingResponse } from 'src/app/models/customer/responses/booking.response.model';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
  providers: [NgbAccordionConfig]
})

export class SearchpageComponent implements OnInit {

  selectedarea:'';
  sites:any;
  didsearch:boolean=false;
  startsite:AddressRequestModel;
  slot:string="Select your slot";
  list=[];
  addressid:number;
  date1: Date;
  date2: Date;
  date3: Date;
  date4: Date;
  bookingdata:BookingResponse;
  searchform:FormGroup;
  searchdata={};
  
  @Output() onshow= new EventEmitter<any>();
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  
  constructor(private fb: FormBuilder,private customer:CustomerService,config: NgbAccordionConfig,
    private modalService: NgbModal) {
    config.closeOthers = true;
    config.type = 'info';
   }

  ngOnInit(): void {
    this.searchform = this.fb.group({
      area : ['',Validators.required],
      starttime : ['',Validators.required],
      endtime : ['',Validators.required]
  })
  }

  assignment(){
    this.assignstartsite();
    this.list=[];
    for(let i=1;i<this.sites.length;i++){
      //console.log(this.sites[i]);
      const detail = this.sites[i];
      const result : AddressRequestModel = {
      aid: detail.sno,
      sitecode: detail.sitecode,
      sitename: detail.sitename,
      lane: detail.lane,
      landmark: detail.landmark,
      area : detail.area,
      place : detail.place,
      pincode : detail.pincode,
      state : detail.state,
      country: detail.country,
      amount: detail.amount,
      sessiontoken: null,
      }
      this.list.push(result);
    }
  }

  assignstartsite(){
    const detail = this.sites[0];
    this.startsite = {
      aid: detail.sno,
      sitecode: detail.sitecode,
      sitename: detail.sitename,
      lane: detail.lane,
      landmark: detail.landmark,
      area : detail.area,
      place : detail.place,
      pincode : detail.pincode,
      state : detail.state,
      country: detail.country,
      amount: detail.amount,
      sessiontoken: null,
    }
  }

  open(aid) {
    this.addressid = aid;
    if(localStorage.getItem("token")!=null){
      const modalRef = this.modalService.open(BookingpageComponent);
      modalRef.componentInstance.addressid = this.addressid;
      modalRef.componentInstance.starttime = this.searchdata["starttime"];
      modalRef.componentInstance.endtime = this.searchdata["endtime"];
      modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
        console.log(receivedEntry);
        this.bookingdata=receivedEntry;
        this.passBack();
      })
    }
    else{
      const modalRef = this.modalService.open(LoginComponent);
    }
  }

  openlogin(){
    const modalRef = this.modalService.open(LoginComponent);
  }

  async passBack(){
    let houramount = (this.bookingdata.amount)*2;
    let minamount = (this.bookingdata.amount/60)*5;
    console.log(this.bookingdata.amount);
    this.bookingdata.amount  =  await Math.round(houramount+minamount);
    localStorage.setItem("bookingdata",JSON.stringify(this.bookingdata));
    console.log(this.bookingdata.amount);
    this.onshow.emit(this.bookingdata);
  }

  async onSubmit(data){
    console.log(data);
    const milliseconds = Math.abs(data.endtime - data.starttime);
    const hours = Math.round(milliseconds / 36e5);
    var diffMins = Math.round(((milliseconds % 86400000) % 3600000) / 60000); // mi
    let starttime = formatDate(new Date(data.starttime),"yyyy-MM-dd HH:mm:ss","en");
    let endtime = formatDate(new Date(data.endtime),"yyyy-MM-dd HH:mm:ss","en");
    this.searchdata["starttime"]=starttime;
    this.searchdata["endtime"]=endtime;
    console.log(hours+" "+diffMins);
    console.log(starttime,endtime);
    const searchdata = {"area":data.area,"starttime":starttime,"endtime":endtime};
    this.sites = await this.customer.getSites(searchdata);
    console.log(this.sites);
    await this.assignment();
    this.didsearch = true;
  }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
