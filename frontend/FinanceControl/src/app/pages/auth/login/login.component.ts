import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {FloatLabel} from 'primeng/floatlabel';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardModule, ButtonModule, InputTextModule, PasswordModule, FloatLabel, ReactiveFormsModule, ToastModule],
  providers: [MessageService]
})
export class Login {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _messageService: MessageService = inject(MessageService);

  protected loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected login(): void {
    if (this.loginForm.invalid) {
      this._messageService.add({ severity: 'error', summary: 'Invalid email or password', detail: 'Email or password is required' });
    }
  }
}
