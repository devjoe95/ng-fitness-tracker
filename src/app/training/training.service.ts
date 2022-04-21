import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Exercise[];
  private runningExercise: Exercise | null;
  private exercises: Exercise[];
  exerciseChanged = new Subject<Exercise | null>();
  constructor() {
    this.availableExercises = [
      { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
      { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
      { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
      { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    ];
    this.runningExercise = null;
    this.exercises = [];
  }
  getAvailableExercises() {
    return this.availableExercises.slice();
  }
  startExercise(exerciseId: string) {
    this.runningExercise =
      this.availableExercises.find((ex) => ex.id === exerciseId) || null;

    this.exerciseChanged.next(
      this.runningExercise ? { ...this.runningExercise } : null
    );
  }
  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.exercises.unshift({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'CANCELLED',
      });
    }
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  completeExercise() {
    if (this.runningExercise) {
      this.exercises.unshift({
        ...this.runningExercise,
        date: new Date(),
        state: 'COMPLETED',
      });
    }
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getRunningExercise() {
    return this.runningExercise ? { ...this.runningExercise } : null;
  }
  getExercises() {
    return [...this.exercises];
  }
}
