import { Injectable } from '@angular/core';
import axios from 'axios';
import { BookingResponse } from '../models/customer/responses/booking.response.model';
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

  async getSites(searchdata){
    let getSitesResponse = await this.instance.post("/api/user/findSites",searchdata);
    console.log(getSitesResponse);
    return getSitesResponse.data;
  }

  async booksite(bookingdata){
    console.log(bookingdata);
    let booksiteResponse = await this.instance.post("/api/user/booksite",bookingdata);
    console.log(booksiteResponse);
    const bookingresponse = await this.assignbookingservice(booksiteResponse.data);
    return bookingresponse;
  }

  async logout(sessiontoken){
    let logoutResponse = await this.instance.post("/api/auth/user/logout",{
      sessiontoken:sessiontoken
    });
    console.log(logoutResponse);
  }

  async assignbookingservice(bookingresponse){
    const address = bookingresponse.address;
    const responsedata:BookingResponse = {
      vnumber: bookingresponse.vnumber,
      vtype: bookingresponse.vtype,
      sitecode: address.sitecode,
      sitename: address.sitename,
      lane: address.lane,
      landmark: address.landmark,
      area: address.area,
      place: address.place,
      pincode: address.pincode,
      state: address.state,
      amount: address.amount,
      country: address.country,
      starttime: bookingresponse.starttime,
      endtime: bookingresponse.endtime
    }
    return responsedata;
  }
}
