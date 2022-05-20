import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  loadingStateChanged: Subject<boolean>;
  constructor(private snackBar: MatSnackBar ) {
    this.loadingStateChanged = new Subject<boolean>();
  }
  showSnackBar(
    message: string,
    action: string | undefined = undefined,
    duration: number = 3000
  ) {
    this.snackBar.open(message, action, { duration });
  }
}
