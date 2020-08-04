import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {

  selectedarea:'';
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }
  onSearch(){
    console.log(this.selectedarea);
  }
}
