import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppRoutes } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule, MatFormField, } from '@angular/material/form-field';
import { MatInputModule, MatOptionModule, MatSelectModule, MatMenuModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
import { CookieService } from 'ngx-cookie-service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RoleGuard } from './shared/guards/role-guard';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SigninComponent } from './pages/signin/signin.component';
import { AccountRegistrationComponent } from './pages/account-registration/account-registration.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';


@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    SigninComponent,
    AccountRegistrationComponent,
    RoleCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'}),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatStepperModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule


  ],
  providers: [
    CookieService,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
