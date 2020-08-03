import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  instance = axios.create({});
  config:any;
  constructor() { }

  async login(logindata){
    console.log(logindata);
    let loginResponse = await this.instance.post("/api/auth/admin/login",logindata);
    console.log(loginResponse.data.token);
    localStorage.setItem("admintoken",loginResponse.data.token);
    let sessiontoken = localStorage.getItem("admintoken");
    await this.getAddress(sessiontoken);
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
  }

  async getAddress(sessiontoken){
    let getAddressResponse = await this.instance.get(`/api/admin/getAddress/${sessiontoken}`);
    console.log(getAddressResponse);
  }
  async logout(sessiontoken){
    this.config={
       "sessiontoken":sessiontoken
    };
    let logoutResponse = await this.instance.post("/api/auth/admin/logout",this.config);
    console.log(logoutResponse);
    return logoutResponse.data;
  }
}
