import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `<h2 mat-dialog>Are you sure?</h2>
    <mat-dialog-actions>
      You have passed &nbsp;<b> {{ passedData.progress }}%</b>
    </mat-dialog-actions>
    <mat-dialog-actions>
      <button mat-flat-button [mat-dialog-close]="true" color="warn">
        Sure
      </button>
      <button mat-flat-button [mat-dialog-close]="false">Nope</button>
    </mat-dialog-actions>`,
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
