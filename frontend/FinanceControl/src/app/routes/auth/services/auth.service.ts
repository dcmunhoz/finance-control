import {inject, Injectable} from '@angular/core';
import {ConfigService} from '../../../shared/services/config/config.service';
import {RegisterUserRequest} from './types/requests/register-user.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRegisteredResponse} from './types/responses/user-registred.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _configService = inject(ConfigService);
  private _http = inject(HttpClient);
  private _baseApi = this._configService.config.apiBase + '/api/auth';

  public register(request: RegisterUserRequest): Observable<UserRegisteredResponse> {
    return this._http.post<UserRegisteredResponse>(this._baseApi + '/register', request);
  }
}
