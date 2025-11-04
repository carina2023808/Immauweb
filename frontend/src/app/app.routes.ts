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
import { PropertyDetailComponent } from './property-detail/property-detail.component';


export const routes: Routes = [
  { path: '', redirectTo: 'vendre', pathMatch: 'full', data: { title: 'Accueil' } },
  { path: 'vendre', component: VendreComponent, data: { title: 'Vendre' } },
  { path: 'louer', component: LouerComponent, data: { title: 'Louer' } },
  { path: 'contact-form', component: ContactFormComponent, data: { title: 'Contact' } },
  { path: 'publier', component: PublierComponent, data: { title: 'Publier' } },
  { path: 'profil', component: ProfilComponent, data: { title: 'Profil' } },
  { path: 'auth', component: AuthFormComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'users', component: UserComponent, data: { title: 'Users' } },
  { path: 'property-detail/:id', component: PropertyDetailComponent, data: { title: 'Detalhes do Imóvel' } },
];
