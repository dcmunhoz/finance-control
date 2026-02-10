import {EnvironmentProviders, makeEnvironmentProviders, provideAppInitializer, inject} from '@angular/core';
import {ConfigService} from './config.service';

export function provideConfigService(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ConfigService, useClass: ConfigService },
    provideAppInitializer(() => {
      const configService = inject(ConfigService);
      configService.load();
    })
  ]);
}
