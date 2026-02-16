import {Component, inject, OnDestroy, signal} from '@angular/core';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {AuthService} from '../../services/auth.service';
import {Message, MessageModule} from 'primeng/message';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {RegisterUserRequest} from '../../services/types/requests/register-user.interface';
import {Router, RouterLink} from '@angular/router';
import {Loading} from '../../../../shared/components/loading/loading.component';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CardModule, Button, FloatLabel, FormsModule, InputText, Password, ReactiveFormsModule, Message, MessageModule, Toast, Loading, RouterLink],
  providers: [MessageService]
})
export class Register implements OnDestroy {
  private _messageService = inject(MessageService);
  private _authService = inject(AuthService);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);

  private _destroy$ = new Subject<void>();

  protected isLoading = signal(false);

  protected registerForm = this._fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
  });

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  protected register(): void {
    if (this.registerForm.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Opss...', detail: 'Todos os campos precisam ser preenchidos corretamente!' });
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.password_confirmation) {
      this._messageService.add({ severity: 'error', summary: 'Opss...', detail: 'Senhas não correspondem!' });
      return;
    }

    let request: RegisterUserRequest = {
      name: <string>this.registerForm.value.name,
      email: <string>this.registerForm.value.email,
      password: <string>this.registerForm.value.password
    }

    this.isLoading.set(true);
    this._authService.register(request)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: () => {
          this._router.navigate(['/login']);
        }
      }).add(() => this.isLoading.set(false));
  }

  protected isInvalid(controlName: string): boolean {
    let control = this.registerForm.get(controlName);
    if (!control) return false;

    return control.touched && control.invalid;
  }
}
