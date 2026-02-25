import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { authdGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path:'login',
    component: Login
  },
  {
    path:'dashboard',
    component: Dashboard,
    canActivate:[authdGuard]
  },
  {
    path: '**',
    redirectTo:'login'
  }
];
