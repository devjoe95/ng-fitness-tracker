import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  pastExercises: MatTableDataSource<Exercise>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: any;
  constructor(private trainingService: TrainingService) {
    this.pastExercises = new MatTableDataSource<Exercise>();
    this.displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
    this.sort = new MatSort();
  }

  ngOnInit(): void {
    this.pastExercises.data = this.trainingService.getExercises();
  }
  ngAfterViewInit(): void {
    this.pastExercises.sort = this.sort;
    this.pastExercises.paginator = this.paginator;
  }
  doFilter(event: any) {
    this.pastExercises.filter = event.target.value.trim().toLowerCase();
  }
}
