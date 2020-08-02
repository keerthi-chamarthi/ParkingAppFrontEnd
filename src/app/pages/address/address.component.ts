import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AddressRequestModel } from 'src/app/models/admin/requests';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  admintoken: string;
  constructor(private fb: FormBuilder,private admin:AdminService) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      sitecode: ['', Validators.required],
      sitename: ['', Validators.required],
      lane: ['',Validators.required],
      landmark: ['',Validators.required],
      area: ['',Validators.required],
      place: ['',Validators.required],
      pincode: ['',Validators.required],
      state: ['',Validators.required],
      country: ['',Validators.required],
      dayslotamount: ['',Validators.required],
      nightslotamount: ['',Validators.required]
    });
  }

  uploadAddress(addressdata){
    console.log(this.findInvalidControls());
    const address:AddressRequestModel = {
      sitecode : addressdata.sitecode,
      sitename: addressdata.sitename,
      lane: addressdata.lane,
      landmark: addressdata.landmark,
      area: addressdata.area,
      place: addressdata.place,
      pincode: addressdata.pincode,
      state: addressdata.state,
      country: addressdata.country,
      dayslotamount: addressdata.dayslotamount,
      nightslotamount: addressdata.nightslotamount,
      sessiontoken: localStorage.getItem("admintoken"),
      
    }
    // this.admintoken = localStorage.getItem("admintoken");
    this.admin.uploadAddress(address);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.addressForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}
}
