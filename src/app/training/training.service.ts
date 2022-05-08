import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private runningExercise: Exercise | null;
  private exercises: Exercise[];
  exerciseChanged = new Subject<Exercise | null>();
  constructor(private db: AngularFirestore) {
    this.runningExercise = null;
    this.exercises = [];
  }
  getAvailableExercises(): Observable<Exercise[]> {
    return this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) =>
          docArray.map((doc) => {
            const data = doc.payload.doc.data() as Exercise;
            const id = doc.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
  startExercise(exerciseId: string) {
    this.getAvailableExercises().subscribe((exercises: Exercise[]) => {
      this.runningExercise =
        exercises.find((ex: Exercise) => ex.id === exerciseId) || null;
    });

    this.exerciseChanged.next(
      this.runningExercise ? { ...this.runningExercise } : null
    );
  }
  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'CANCELLED',
      } as Exercise);
    }
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  completeExercise() {
    if (this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        date: new Date(),
        state: 'COMPLETED',
      } as Exercise);
    }
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getRunningExercise() {
    return this.runningExercise ? { ...this.runningExercise } : null;
  }
  getExercises(): Observable<Exercise[]> {
    return this.db
      .collection('exercises')
      .snapshotChanges()
      .pipe(
        map((docArray) =>
          docArray.map((doc) => {
            const data = doc.payload.doc.data() as Exercise;
            const id = doc.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
  addDataToDatabase(exercise: Exercise) {
    this.db.collection<Exercise>('exercises').add(exercise);
  }
  deleteDataFromDatabase(id: string): Promise<void> {
    return this.db.collection<Exercise>('exercises').doc<Exercise>(id).delete();
  }
}
