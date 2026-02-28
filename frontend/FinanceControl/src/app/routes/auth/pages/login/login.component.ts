import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LoginRequest} from '../../services/types/requests/login.interface';
import {Loading} from '../../../../shared/components/loading/loading.component';
import {Subject, takeUntil} from 'rxjs';
import {FCInput} from '../../../../ui/components/input/input';
import {FCButton} from '../../../../ui/components/button/button';
import {FCNotificationService} from '../../../../ui/services/notification-service';
import {email, form, FormField, required} from '@angular/forms/signals';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, Loading, FCInput, FCButton, FormField]
})
export class Login implements OnDestroy {
  private readonly _notificationService = inject(FCNotificationService)
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  private _destroy$ = new Subject<void>();

  protected isLoading = signal(false);

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private loginModel = signal<LoginRequest>({
    email: '',
    password: ''
  });

  protected loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Informe o e-mail.' });
    email(path.email, { message: 'Informe um e-mail válido.' });
    required(path.password, { message: 'Informe a senha.' });
  });

  protected login(): void {
    if (this.loginForm().invalid()) {
      this._notificationService.error('Preencha e-mail e senha.');
      return;
    }

    this.isLoading.set(true);
    this._authService.login(this.loginForm().value())
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: _ => {
          this._router.navigate(['/']);
        },
        error: _ => {
          this._notificationService.error('Usuário ou senha invalido(s)');
        }
      }).add(() => this.isLoading.set(false));
  }
}


