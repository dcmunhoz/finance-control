import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonModule} from '../../../ui/button/button.module';


@Component({
  selector: 'example-index',
  templateUrl: './example-index.component.html',
  styleUrls: ['./example-index.component.scss'],
  imports: [
    ButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleIndexComponent { }
