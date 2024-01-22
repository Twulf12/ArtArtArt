import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ArtPageComponent } from './pages/art-page/art-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UploadComponent } from './pages/upload/upload.component';
import { CommissionComponent } from './pages/commission/commission.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'art',
    component: ArtPageComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'commission',
    component: CommissionComponent,
  },
];
