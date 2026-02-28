import {Component, inject, OnDestroy, signal} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {RegisterUserRequest} from '../../services/types/requests/register-user.interface';
import {Router, RouterLink} from '@angular/router';
import {Loading} from '../../../../shared/components/loading/loading.component';
import {Subject, takeUntil} from 'rxjs';
import {FCInput} from '../../../../ui/components/input/input';
import {FCButton} from '../../../../ui/components/button/button';
import {FCNotificationService} from '../../../../ui/services/notification-service';
import {email, form, FormField, required, validate} from '@angular/forms/signals';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [Loading, RouterLink, FCInput, FCButton, FormField]
})
export class Register implements OnDestroy {
  private _notificationService = inject(FCNotificationService);
  private _authService = inject(AuthService);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);

  private _destroy$ = new Subject<void>();

  protected isLoading = signal(false);

  private registerModel = signal<RegisterUserRequest>({
    name: '',
    password: '',
    email: '',
    confirmationPassword: ''
  });

  protected registerForm = form(this.registerModel, (path) => {
    required(path.name, { message: "Nome deve ser informado!" });

    required(path.email, { message: "E-mail deve ser informado!" });
    email(path.email, { message: "E-mail inválido!" });

    required(path.password, { message: "Senha deve ser informada!" });
    required(path.confirmationPassword, { message: "Senha deve ser informada!" });
    validate(path.confirmationPassword, ({ value, valueOf }) => {
      if ((value() === '' || valueOf(path.password) === '') ||
        (value() === valueOf(path.password))) return undefined;

      return {
        kind: 'passwordsNotMatch',
        message: 'As senhas devem ser iguais!'
      };
    })
  });

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  protected register(): void {
    if (this.registerForm().invalid()) {
      this._notificationService.error('Todos os campos precisam ser preenchidos corretamente!');
      return;
    }

    if (this.registerForm().value().password !== this.registerForm().value().confirmationPassword) {
      this._notificationService.error('Senhas não correspondem!');
      return;
    }

    this.isLoading.set(true);
    this._authService.register(this.registerForm().value())
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: () => {
          this._router.navigate(['/login']);
        }
      }).add(() => this.isLoading.set(false));
  }
}
