import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { Address } from '../models/admin/responses/address.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  instance = axios.create({});
  config:any;
  sites=[];
  constructor(private router:Router) { }

  async login(logindata){
    console.log(logindata);
    let loginResponse = await this.instance.post("/api/auth/admin/login",logindata);
    console.log(loginResponse.data.token);
    localStorage.setItem("admintoken",loginResponse.data.token);
    let sessiontoken = localStorage.getItem("admintoken");
    this.sites=await this.getAddress(sessiontoken);
    console.log(this.sites);
    this.navigate();
  }

  async signup(signupdata){
    console.log(signupdata);
    let signupResponse = await this.instance.post(
      "/api/auth/admin/signup",signupdata
    );
    console.log(signupResponse);
    localStorage.setItem("admintoken",signupResponse.data.token);
  }

  async uploadAddress(addressdata){
    console.log(this.config);
    let uploadResponse = await this.instance.post("/api/admin/address/upload",addressdata);
    console.log(uploadResponse);
    if(uploadResponse.data=="Success"){
      await this.getAddress(localStorage.getItem("admintoken"));
      return "Success";
    }
    return uploadResponse.data;
  }

  async getAddress(sessiontoken){
    let getAddressResponse = await this.instance.get(`/api/admin/getAddress/${sessiontoken}`);
    console.log(getAddressResponse.data);
    localStorage.setItem("sites",JSON.stringify(getAddressResponse.data));
    return getAddressResponse.data;
  }
  async logout(sessiontoken){
    this.config={
       "sessiontoken":sessiontoken
    };
    let logoutResponse = await this.instance.post("/api/auth/admin/logout",this.config);
    console.log(logoutResponse);
    return logoutResponse.data;
  }

  navigate(){
    if(localStorage.getItem("admintoken")!="null")
    {
      // this.router.navigate(['/response']);
      this.router.navigateByUrl('/response', { state: this.sites });
    }
  }
}
