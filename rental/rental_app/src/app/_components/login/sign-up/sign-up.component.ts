import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  familyName:string | undefined;
  email:string | undefined;
  password:string | undefined;
  givenName:string | undefined;

  ngOnInit(): void {
  }

  register(){

  }

}
