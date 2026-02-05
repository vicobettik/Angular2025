import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'reactive',
    loadChildren:() => import('./reactive/reactive.routes').then((c) => c.reactiveRoutes)
  },
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.routes').then((c) => c.authRoutes)
  },
  {
    path:'country',
    loadChildren:() => import('./country/country.routes').then((c) => c.countryRoutes)
  },
  {
    path:'**',
    redirectTo: 'reactive'
  }
];
