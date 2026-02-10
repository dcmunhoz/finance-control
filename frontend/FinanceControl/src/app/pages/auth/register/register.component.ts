import {Component} from '@angular/core';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CardModule, Button, FloatLabel, FormsModule, InputText, Password, ReactiveFormsModule]
})
export class Register {

}
