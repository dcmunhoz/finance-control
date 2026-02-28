import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FCNotificationService {
  public warning(message: string): void {
    alert(message);
  }

  public error(message: string): void {
    alert(message);
  }

  public info(message: string): void {
    alert(message);
  }

  public success(message: string): void {
    alert(message);
  }
}
