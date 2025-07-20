import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import {ButtonModule} from '../../../ui/button/button.module';
import {InputModule} from '../../../ui/input/input.module';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'example-index',
  templateUrl: './example-index.component.html',
  styleUrls: ['./example-index.component.scss'],
  imports: [
    ButtonModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleIndexComponent {
  protected inputTeste = signal<string>('');
  private _fb = inject(FormBuilder);

  protected form = this._fb.group({
    nome: ['', Validators.required],
  });

  protected onClickBotao(): void {
    console.log(this.form);
  }

}
