import {Component, input, output} from '@angular/core';

@Component({
  selector: 'fc-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class FCButton {
  public label = input<string>('', { alias: 'p-label' });
  public click = output({ alias: 'p-click' });

  protected onClick() {
    this.click.emit();
  }
}
