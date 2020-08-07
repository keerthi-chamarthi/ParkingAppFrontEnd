import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  instance = axios.create({});
  config:any;
  sites:any;
  constructor() {
  }

  async signup(userdata){
    console.log(userdata);
    let signupResponse = await this.instance.post(
      "/api/auth/user/signup",userdata
    );
    console.log(signupResponse);
    localStorage.setItem("token",signupResponse.data.token);
  }

  async login(credentials){
    console.log(credentials);
    let loginResponse = await this.instance.post("/api/auth/user/login",credentials);
    console.log(loginResponse.data.token);
    localStorage.setItem("token",loginResponse.data.token);
  }

  async getSites(area,slot){
    console.log(area);
    //let getSitesResponse = await this.instance.get(`/api/getsites/${area}`);
    let getSitesResponse = await this.instance.post("/api/user/getsites/",{
      area:area,
      slot:slot
    });
    //console.log(JSON.stringify(getSitesResponse.data));
    return JSON.stringify(getSitesResponse.data);
  }

  async booksite(bookingdata){
    let booksiteResponse = await this.instance.post("/api/user/booksite",bookingdata);
    console.log(booksiteResponse);
  }

  async logout(sessiontoken){
    let logoutResponse = await this.instance.post("/api/auth/user/logout",{
      sessiontoken:sessiontoken
    });
    console.log(logoutResponse);
  }
}
