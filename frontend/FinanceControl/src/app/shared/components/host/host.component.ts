import {Component, signal} from '@angular/core';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {MenuItem} from 'primeng/api';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss'],
  imports: [ TieredMenuModule, RouterModule ]
})
export class Host {
  protected menuItems = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-bar',
      routerLink: '/dashboard',
    }
  ]);
}
