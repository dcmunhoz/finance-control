import {inject, Injectable} from '@angular/core';
import {ConfigService} from '../../../shared/services/config/config.service';
import {RegisterUserRequest} from './types/requests/register-user.interface';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {UserRegisteredResponse} from './types/responses/user-registred.interface';
import {LoginRequest} from './types/requests/login.interface';
import {UserAuthenticatedResponse} from './types/responses/user-authenticated.interface';
import {UserAuthenticated} from './types/user-authenticated.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _configService = inject(ConfigService);
  private _http = inject(HttpClient);
  private _baseApi = this._configService.config.apiBase + '/api/auth';

  public register(request: RegisterUserRequest): Observable<UserRegisteredResponse> {
    return this._http.post<UserRegisteredResponse>(this._baseApi + '/register', request);
  }

  public login(request: LoginRequest) {
    return this._http.post<UserAuthenticatedResponse>(this._baseApi + '/login', request)
      .pipe(map(response => {
        sessionStorage.clear();

        sessionStorage.setItem('token', JSON.stringify(response));

        return response;
      }));
  }

  public getUserToken() : string {
    var userSession = sessionStorage.getItem('token');
    if (!userSession) return '';

    var user = JSON.parse(userSession) as UserAuthenticated;

    return user.token;
  }

  public isAuthenticated(): boolean {
    return this.getUserToken() !== '';
  }
}
