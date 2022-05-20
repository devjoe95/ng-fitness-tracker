import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { endLoading, startLoading } from 'src/app/store/actions/ui.action';
import { State } from 'src/app/store/state';
import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];
  isLoading: boolean = false;
  constructor(
    private trainingService: TrainingService,
    private store: Store<{ ui: State }>
  ) {
    this.exercises = [];
  }
  ngOnInit(): void {
    this.store.select('ui').subscribe((state: State) => {
      this.isLoading = state.isLoading;
    });
    this.trainingService.getAvailableExercises().subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      },
      () => {}
    );
  }
  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }
}
