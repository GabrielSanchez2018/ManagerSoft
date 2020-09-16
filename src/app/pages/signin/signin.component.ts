/*=========================
Name:Gabriel Sanchez
Date: Sep 12, 2020
Assignment: sign in component

==========================*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  expires: number;
  date: number

  constructor(private router: Router, private fb: FormBuilder,private cookieService: CookieService, private http: HttpClient ) {
  }


  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])]
  });
  }

  signin() {
    const username = this.form.controls.username.value
    const password = this.form.controls.password.value


    this.http.post('/api/session/signin', {

      username,
      password
    }).subscribe(res => {

      console.log('here',res)
      if (res['auth']) {
        var date = new Date();
         var exp = date.setTime(date.getTime() + (30 * 1000));
        console.log('var date', date)
        console.log('var dte', exp)
        //'/', 'localhost', false, "Strict" will secure the cookie
        this.cookieService.set('sessionuser', username, 1 , '/', '', false, 'Strict' );

        this.router.navigate(['/']);
      } else {
        this.errorMessage = res['text'];
      }
    });
  }

}
