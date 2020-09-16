import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  show: boolean;
  year: number = Date.now();


  authService: any;
  sessionuser: any;
  paysession: any;
  username: string;
  isAuthenticated: boolean;
  EmployeeId: string;
  empinfo: Object;
  users: any;
  user: any;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.user = this.cookieService.get('sessionuser');
    this.http.get('/api/users/' + this.cookieService.get('sessionuser') + '/role').subscribe(res => {
      if (res === "admin") {
          this.show = true;
      } else {
          this.show = false;
      }
    });

    this.http.get('/api/users/').subscribe(res => {
      this.users = res;
      console.log('this users', this.users)
    })
  }



  ngOnInit() {

  }

  onLogout() {
    localStorage.clear();
    localStorage.removeItem(this.sessionuser);
    localStorage.removeItem(this.paysession);
    this.cookieService.delete('sessionuser')
    this.cookieService.delete('paysession')
    this.router.navigate(['/session/signin']);
    //the follogin function will reload the browser when you sign out
    //This clears the cookie
   // window.location.reload();
  }


}

