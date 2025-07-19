import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'examples',
    loadChildren: () => import('./pages/examples/examples.routes').then(c => c.EXAMPLES_ROUTES)
  }
];
