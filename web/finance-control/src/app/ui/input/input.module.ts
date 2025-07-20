import {NgModule} from '@angular/core';
import {InputComponent} from './input.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  declarations: [InputComponent],
  exports: [InputComponent]
})
export class InputModule { }
