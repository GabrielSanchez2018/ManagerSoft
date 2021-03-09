import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  deviceInfo = null;
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
  weather: any;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private deviceService: DeviceDetectorService) {
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

    //Weather
    this.http.get('/api/test/weather').subscribe(res => {
      this.weather = res;
      console.log('this weather', this.weather)
    })

    
  }

  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.

    
  }

  weatherInfo(){
    return this.weather.main.temp
  

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

