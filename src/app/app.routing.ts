import {Routes} from '@angular/router';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {HomeComponent} from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AccountRegistrationComponent } from './pages/account-registration/account-registration.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SessionGuard } from './shared/guards/session.guard';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { RoleGuard } from './shared/guards/role-guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [SessionGuard]
      },
      /*
        New components go here...
       */
      {
        path: 'role-crate',
        component: RoleCreateComponent,
        canActivate: [RoleGuard]
      },

    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },

      {
        path: 'account-registration',
        component: AccountRegistrationComponent
      },
      {
        path: 'role-create',
        component: RoleCreateComponent
      },
      // {
      //   path: 'forgot-password',
      //   component: ForgotPasswordComponent
      // }
    ]
  },
];
