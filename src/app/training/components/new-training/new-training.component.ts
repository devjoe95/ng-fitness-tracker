import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];
  constructor(private trainingService: TrainingService) {
    this.exercises = [];
  }
  ngOnInit(): void {
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
