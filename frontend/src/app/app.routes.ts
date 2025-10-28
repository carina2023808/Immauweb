import { Routes } from '@angular/router';
import { VendreComponent } from './pages/vendre/vendre.component';
import { LouerComponent } from './pages/louer/louer.component';
import { PublierComponent } from './pages/publier/publier.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

import { AuthFormComponent } from './auth-form/auth-form.component';
import { UserComponent } from './pages/user/user.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';





export const routes: Routes = [
  { path: 'vendre', component: VendreComponent },
  { path: 'louer', component: LouerComponent },
  // { path: 'contact', component: ContactComponent },
   { path: 'contact-form', component: ContactFormComponent },
  { path: 'publier', component: PublierComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'auth', component: AuthFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'vendre', pathMatch: 'full' },
  { path: 'users', component: UserComponent },
];
