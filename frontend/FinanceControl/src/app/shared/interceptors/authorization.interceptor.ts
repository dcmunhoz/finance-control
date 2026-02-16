import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../../routes/auth/services/auth.service';

export const authorizationInterceptor : HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  let token = authService.getUserToken();

  if (token != '') {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
}
