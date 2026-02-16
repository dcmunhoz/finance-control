import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {tap} from 'rxjs';
import {ProblemResponse} from '../responses/problem.interface';

export const globalErrorHandler: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      error: (error: HttpErrorResponse) => {
        let errorResponse = error.error as ProblemResponse;
        console.log(errorResponse);
      },
    })
  );
};
