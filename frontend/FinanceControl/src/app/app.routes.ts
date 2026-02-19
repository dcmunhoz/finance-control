import { Routes } from '@angular/router';
import { Host } from './shared/components/host/host.component';
import {AuthGuard} from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Host,
    canActivate: [AuthGuard]
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
