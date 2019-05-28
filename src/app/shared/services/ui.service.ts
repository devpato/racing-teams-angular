import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private reloadStatus = new BehaviorSubject<boolean>(null);
  dataReloadStatus = this.reloadStatus.asObservable();

  constructor() {}

  setReloadStatus(status: boolean) {
    this.reloadStatus.next(status);
  }
}
