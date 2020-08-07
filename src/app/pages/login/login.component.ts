import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupRequestModel, LoginRequestModel } from 'src/app/models/customer/requests';
import { AdminLoginRequestModel , AdminSignupRequestModel} from 'src/app/models/admin/requests';
import { CustomerService } from 'src/app/services/customer.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  signup: FormGroup;
  isnotvalidUser: boolean=false;
  alreadyexistUser: boolean = false;
  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder, public customer:CustomerService, public router:Router,
    private admin: AdminService) {
    this.loginForm();
    this.signUpForm();
  }

  ngOnInit(): void {}

  loginForm() {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUpForm() {
    this.signup = this.fb.group({
      email: ['', Validators.required],
      susername: ['', Validators.required],
      spassword: ['', Validators.required],
      scpassword: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  get sign() {
    return this.signup.controls;
  }
  async onLoginCustomerSubmit(logindata) {
    console.log(logindata);
    const credentials : LoginRequestModel = {userId: logindata.username, password: logindata.password};
    await this.customer.login(credentials);
    console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token")!="null")
    {
      this.activeModal.dismiss('Cross click');
      this.router.navigate(['/profile']);
    }
    else{
      this.isnotvalidUser = true;
    }
  }

  async onLoginAdminSubmit(logindata) {
    console.log(logindata);
    const credentials : AdminLoginRequestModel = {userId: logindata.username, password: logindata.password};
    await this.admin.login(credentials);
    if(localStorage.getItem("admintoken")!="null")
    {
      this.activeModal.dismiss('Cross click');
      this.router.navigate(['/response']);
    }
    else{
      this.isnotvalidUser = true;
    }
  }

  onSignUpCustomerSubmit(signupdata) {
    console.log(signupdata);
    const details : SignupRequestModel = { userId: signupdata.susername, password: signupdata.spassword , emailId: signupdata.email , phoneNumber: signupdata.phone};
    console.log(details);
    this.customer.signup(details);
    console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token")!=null)
    {
      this.activeModal.dismiss('Cross click');
      this.router.navigate(['/profile']);
    }
    else{
      this.alreadyexistUser = true;
    }
  }
  async onSignUpAdminSubmit(signupdata) {
    console.log(signupdata);
    const credentials : AdminSignupRequestModel ={ userId: signupdata.susername, password: signupdata.spassword , emailId: signupdata.email , phoneNumber: signupdata.phone};
    await this.admin.signup(credentials);
    if(localStorage.getItem("admintoken")!="null"){
      this.activeModal.dismiss('Cross click');
      this.router.navigate(['response']);
    }
    else{
      this.alreadyexistUser = true;
    }
  }
}
