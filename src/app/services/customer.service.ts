import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  instance = axios.create({});
  config:any;
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

}
