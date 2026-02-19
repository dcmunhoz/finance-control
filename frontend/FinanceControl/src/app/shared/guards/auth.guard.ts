import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../routes/auth/services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  if (!authService.isAuthenticated())
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnPath: state.url }
    })

  return true;
}
