import {Routes, RouterModule} from '@angular/router';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {HomeComponent} from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AccountRegistrationComponent } from './pages/account-registration/account-registration.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SessionGuard } from './shared/guards/session.guard';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { RoleGuard } from './shared/guards/role-guard';
import { AdminComponent } from './pages/admin/admin.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { AssetCreateComponent } from './dialogs/asset-create/asset-create.component';
import { AssetTypeComponent } from './dialogs/asset-type/asset-type.component';
import { ServiceCreateDeleteDialogComponent } from './dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { AssetFieldsComponent } from './pages/asset-fields/asset-fields.component';
import { LocationCreateComponent } from './dialogs/location-create/location-create.component';

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
        canActivate: [SessionGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'assets',
        component: AssetsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'asset-create',
        component: AssetCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'asset-type',
        component: AssetTypeComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'asset-fields',
        component: AssetFieldsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'service-create-delete-dialog',
        component: ServiceCreateDeleteDialogComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'location-create',
        component: LocationCreateComponent,
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
