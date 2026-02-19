import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {FloatLabel} from 'primeng/floatlabel';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {Router, RouterLink} from '@angular/router';
import {MessageModule} from 'primeng/message';
import {AuthService} from '../../services/auth.service';
import {LoginRequest} from '../../services/types/requests/login.interface';
import {Loading} from '../../../../shared/components/loading/loading.component';
import {Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardModule, ButtonModule, InputTextModule, PasswordModule, FloatLabel, ReactiveFormsModule, ToastModule, RouterLink, MessageModule, Loading],
  providers: [MessageService]
})
export class Login implements OnDestroy {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _messageService: MessageService = inject(MessageService);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  private _destroy$ = new Subject<void>();

  protected isLoading = signal(false);

  protected loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  protected login(): void {
    if (this.loginForm.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid e-mail or password', detail: 'E-mail or password is required' });
      return;
    }

    this.isLoading.set(true);

    let request: LoginRequest = this.loginForm.value as LoginRequest;
    this._authService.login(request)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: _ => {
          this._router.navigate(['/']);
        },
        error: _ => {
          this._messageService.add({ severity: 'error', summary: 'Usuário inválido.' });
        }
      }).add(() => this.isLoading.set(false));
  }
}


