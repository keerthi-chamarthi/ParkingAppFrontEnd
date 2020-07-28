import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {
    // this.signupForm();
  }

  ngOnInit(): void {
  }

  // signupForm() {
  //   this.signUpForm = this.fb.group({
  //     username: ['', Validators.required ],
  //     password: ['', Validators.required ],
  //     cpassword: ['', Validators.required ],
  //     phone: ['', Validators.required ],
  //     email: ['', Validators.required ],
  //   });
  // }
}
