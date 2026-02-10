import {Component, inject} from '@angular/core';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CardModule, Button, FloatLabel, FormsModule, InputText, Password, ReactiveFormsModule]
})
export class Register {
  private _authService = inject(AuthService);

  public register(): void {
    this._authService.register();
  }
}
