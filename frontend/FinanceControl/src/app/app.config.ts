import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {definePreset} from '@primeuix/themes';
import {provideConfigService} from './shared/services/config/config.provider';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {globalErrorHandler} from './shared/interceptors/global-error.interceptor';
import {MessageService} from 'primeng/api';
import {authorizationInterceptor} from './shared/interceptors/authorization.interceptor';

const financePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}',
      950: '{slate.950}'
    }
  }
});


export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme:{
        preset: financePreset
      }
    }),
    MessageService,
    provideConfigService(),
    provideHttpClient(
      withInterceptors([
        authorizationInterceptor,
        globalErrorHandler
      ])
    )
  ]
};
