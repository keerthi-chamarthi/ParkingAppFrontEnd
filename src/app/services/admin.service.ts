import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  instance = axios.create({});
  constructor() { }

  async login(logindata){
    console.log(logindata);
    let loginResponse = await this.instance.post("/api/auth/admin/login",logindata);
    console.log(loginResponse.data.token);
    localStorage.setItem("admintoken",loginResponse.data.token);
  }

  async signup(signupdata){
    console.log(signupdata);
    let signupResponse = await this.instance.post(
      "/api/auth/admin/signup",signupdata
    );
    console.log(signupResponse);
    localStorage.setItem("admintoken",signupResponse.data.token);
  }
}
