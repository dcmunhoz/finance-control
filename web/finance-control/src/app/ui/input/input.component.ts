import { ChangeDetectionStrategy, Component, effect, forwardRef, input, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

type INPUT_TYPES = 'text' | 'password';

@Component({
  selector: 'p-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class InputComponent implements ControlValueAccessor {
  public type = input<INPUT_TYPES>('text');
  public label = input('');
  public placeholder = input('');
  public help = input('');
  public id = input('');
  public invalid = input(false, {
    transform: (value: string | boolean) => {
      return value == 'true' || value == '';
    }
  });

  protected internalValue = signal<string>('');
  protected isDisabled: boolean = false;
  protected internalId = signal('');

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this._onChange(this.internalValue());
    });

    this.internalId.set(this._generateId(this.id()));
  }

  private _generateId(id: string): string {
    if (id !== '' && id !== undefined && id !== null)
      return id;

    return Math.random().toString(36).substring(2, 10);
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public writeValue(value: any): void {
    this.internalValue.set(value);
  }

  public setDisabledState(disable: boolean): void {
    this.isDisabled = disable;
  }

  protected touched(): void {
    this._onTouched();
  }


}
