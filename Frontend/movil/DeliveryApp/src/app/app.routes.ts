import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'acceso',
    loadChildren: () => import('./pages/acceso/acceso-routes')
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home-routes')
  },
  {
    path: '**',
    redirectTo: 'acceso',
    pathMatch: 'full',
  },
];
