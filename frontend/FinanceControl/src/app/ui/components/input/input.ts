import {Component, inject, input, model, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NgControl} from '@angular/forms';
import {FormValueControl} from '@angular/forms/signals';

export enum FCButtonType {
  Text = 'text',
  Password = 'password'
}

@Component({
  selector: 'fc-input',
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
  imports: [
    FormsModule
  ]
})
// ControlValueAccessor was implemented only for study. New form signal control accessor will be used instead.
export class FCInput implements ControlValueAccessor, FormValueControl<string> {
  public type = input<FCButtonType | string>(FCButtonType.Text, { alias: 'p-type' });
  public placeholder = input<string>('', { alias: 'p-placeholder' });
  public label = input<string>('', { alias: 'p-label' });

  protected ngControl = inject(NgControl, { optional: true });

  protected id = signal<string>('');
  public value = model<string>('');
  public disabled = model(false);

  protected get errorMessages(): string[] {
    if (!this.hasErrors()) return [];

    let errorKeys = Object.keys(this.ngControl?.errors ?? []);

    return errorKeys.map(e => this.ngControl?.errors![e].message);
  }

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  constructor() {
    this.id.set(crypto.randomUUID());
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
    this.value.set(obj);
  }

  registerOnChange(fn: any): void {
   this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected onNgModelChange(value: any): void {
    this.value.set(value);
    this.onChange(value);
  }

  protected hasErrors(): boolean {
    if (!this.ngControl) return false;

    let errors = Object.keys(this.ngControl.errors ?? []);

    return <boolean>this.ngControl.touched &&
           errors.length > 0;
  }
}
