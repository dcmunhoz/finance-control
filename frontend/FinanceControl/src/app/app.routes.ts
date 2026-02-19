import { Routes } from '@angular/router';
import { Host } from './shared/components/host/host.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {DASHBOARD_ROUTES} from './routes/dashboard/dashboard.rautes';

export const routes: Routes = [
  {
    path: '',
    component: Host,
    canActivate: [AuthGuard],
    children: [
      ...DASHBOARD_ROUTES
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./routes/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  }
];
