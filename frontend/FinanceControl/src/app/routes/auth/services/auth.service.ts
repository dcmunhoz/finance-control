import {inject, Injectable} from '@angular/core';
import {ConfigService} from '../../../shared/services/config.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _configService = inject(ConfigService);

  public register() {
    console.log('Register: ', this._configService.config.apiBase);
  }
}
