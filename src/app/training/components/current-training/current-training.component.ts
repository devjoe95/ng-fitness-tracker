import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  runningExercise: Exercise | null;
  progress: number;
  timer: any;
  isPaused: boolean;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {
    this.runningExercise = null;
    this.isPaused = false;
    this.progress = 0;
  }

  ngOnInit(): void {
    this.runningExercise = this.trainingService.getRunningExercise();
    const step = this.runningExercise
      ? (this.runningExercise?.duration / 100) * 1000
      : 1000;
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.progress += 1;
      }
      if (this.progress >= 100) {
        this.trainingService.completeExercise();

        clearInterval(this.timer);
      }
    }, step);
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
  onStop() {
    this.isPaused = true;
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      width: '300px',
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.isPaused = false;
      }
    });
  }
  onTogglePause() {
    this.isPaused = !this.isPaused;
  }
}
