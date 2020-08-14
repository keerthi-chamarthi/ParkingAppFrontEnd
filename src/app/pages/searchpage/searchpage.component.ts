import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { AddressRequestModel } from 'src/app/models/admin/requests';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingpageComponent } from '../bookingpage/bookingpage.component';
import { LoginComponent } from '../login/login.component';
import {formatDate} from '@angular/common';

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
  bookingdata;
  searchform:FormGroup;
  @Output() onshow= new EventEmitter<any>();

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
    this.setTime();
  }
  async onSearch(){
    console.log(this.selectedarea,this.slot);
    let response = await this.customer.getSites(this.selectedarea,this.slot);
    this.sites = JSON.parse(response);
    console.log(this.sites);
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
      dayslotamount: detail.dayslotamount,
      nightslotamount: null,
      sessiontoken: null,
    }
    this.assignment();
    this.didsearch=true;
  }

  onslotSelection(selectedslot){
    console.log(selectedslot);
    this.slot = selectedslot;
  }

  assignment(){
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
      dayslotamount: detail.dayslotamount,
      nightslotamount: null,
      sessiontoken: null,
      }
      this.list.push(result);
    }
  }

  open(aid) {
    this.addressid = aid;
    if(localStorage.getItem("token")!=null){
      const modalRef = this.modalService.open(BookingpageComponent);
      modalRef.componentInstance.addressid = this.addressid;
      modalRef.componentInstance.slot = this.slot;
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

  setTime(){
    let todaydate = formatDate(new Date(), 'dd/M/yyyy h:mm:ss a', 'en');
    let plaindate = formatDate(new Date(),'dd/M/yyyy','en');
    this.date1 = new Date();
    if(Date.parse(todaydate)>Date.parse(plaindate+" "+'10:00:00 AM')){
      this.date1.setDate(this.date1.getDate()+1);
    }
    this.date2 = new Date();
    if(Date.parse(todaydate)>Date.parse(plaindate+" "+'2:00:00 PM')){
      this.date2.setDate(this.date2.getDate()+1);
    }
    this.date3 = new Date();
    if(Date.parse(todaydate)>Date.parse(plaindate+" "+'6:00:00 PM')){
      this.date3.setDate(this.date3.getDate()+1);
    }
    this.date4 = new Date();
    if(Date.parse(todaydate)>Date.parse(plaindate+" "+'10:00:00 PM')){
      this.date4.setDate(this.date4.getDate()+1);
    }
  }

  passBack(){
    this.onshow.emit(this.bookingdata);
  }

  onSubmit(data){
    console.log(data);
    const milliseconds = Math.abs(data.endtime - data.starttime);
    const hours = Math.round(milliseconds / 36e5);
    var diffMins = Math.round(((milliseconds % 86400000) % 3600000) / 60000); // mi
    let starttime = formatDate(new Date(data.starttime),"yyyy-MM-dd HH:mm:ss","en");
    let endtime = formatDate(new Date(data.endtime),"yyyy-MM-dd HH:mm:ss","en");
    console.log(hours+" "+diffMins);
    console.log(starttime,endtime);
  }
}
