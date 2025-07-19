import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

export enum ButtonType {
  Filled = 'filled',
  Outlined = 'outlined',
  Text = 'text',
}

export enum ButtonSeverity {
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
  Danger = 'danger',
}

@Component({
  selector: 'p-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ButtonComponent {
  public onClick = output<void>();
  public label = input.required<string>();
  public type = input<ButtonType | 'filled' | 'outlined' | 'text'>(ButtonType.Filled);
  public severity = input<ButtonSeverity | 'primary' | 'success' | 'warning' | 'info' | 'danger'>(ButtonSeverity.Primary);

  protected severityEnum = ButtonSeverity;
  protected typeEnum = ButtonType;

  constructor() {}

  protected isSeverity(comparasion: ButtonSeverity): boolean {
    return comparasion == this.severity();
  }

  protected isType(comparasion: ButtonType): boolean {
    return comparasion == this.type();
  }

}
