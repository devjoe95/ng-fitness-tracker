import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from '../../training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining: boolean;
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) {
    this.onGoingTraining = false;
    this.exerciseSubscription = new Subscription();
  }
  ngOnInit(): void {
    this.trainingService.exerciseChanged.subscribe((exercise) => {
      if (exercise) {
        this.onGoingTraining = true;
      } else {
        this.onGoingTraining = false;
      }
    });
  }
  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
