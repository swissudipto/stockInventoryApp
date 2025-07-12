import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
      emailId: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
    });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit(): void {
    console.log("Login Component Initialised");
  }

  loginClick(){
    console.log("Login Clicked");
  }
}
