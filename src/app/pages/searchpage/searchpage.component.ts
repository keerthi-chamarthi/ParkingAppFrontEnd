import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { AddressRequestModel } from 'src/app/models/admin/requests';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingpageComponent } from '../bookingpage/bookingpage.component';
import { LoginComponent } from '../login/login.component';

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
  constructor(private fb: FormBuilder,private customer:CustomerService,config: NgbAccordionConfig,private modalService: NgbModal) {
    config.closeOthers = true;
    config.type = 'info';
   }

  ngOnInit(): void {
    
  }
  async onSearch(){
    console.log(this.selectedarea,this.slot);
    let response = await this.customer.getSites(this.selectedarea,this.slot);
    this.sites = JSON.parse(response);
    console.log(this.sites);
    const detail = this.sites[0];
    this.startsite = {
    aid: detail[0],
    sitecode: detail[9],
    sitename: detail[10],
    lane: detail[5],
    landmark: detail[12],
    area : detail[2],
    place : detail[8],
    pincode : detail[7],
    state : detail[11],
    country: detail[3],
    dayslotamount: detail[60],
    nightslotamount: detail[120],
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
      aid: detail[0],
      sitecode: detail[9],
      sitename: detail[10],
      lane: detail[5],
      landmark: detail[12],
      area : detail[2],
      place : detail[8],
      pincode : detail[7],
      state : detail[11],
      country: detail[3],
      dayslotamount: detail[60],
      nightslotamount: detail[120],
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
    }
    else{
      const modalRef = this.modalService.open(LoginComponent);
    }
  }
}
