import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideConfigService} from './shared/services/config/config.provider';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {globalErrorHandler} from './shared/interceptors/global-error.interceptor';
import {authorizationInterceptor} from './shared/interceptors/authorization.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideConfigService(),
    provideHttpClient(
      withInterceptors([
        authorizationInterceptor,
        globalErrorHandler
      ])
    )
  ]
};
