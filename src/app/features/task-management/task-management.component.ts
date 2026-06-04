import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskService } from '../../services/task.service';
import { Task, TaskFilter } from '../../models/interfaces/task.interface';
import { TaskToolbarComponent } from './task-toolbar/task-toolbar.component';
import { TaskFilterBarComponent } from './task-filter-bar/task-filter-bar.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { TaskModalComponent } from './task-modal/task-modal.component';

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [
    CommonModule,
    TaskToolbarComponent,
    TaskFilterBarComponent,
    TaskTableComponent,
    TaskModalComponent,
  ],
  templateUrl: './task-management.component.html',
})
export class TaskManagementComponent implements OnInit, OnDestroy {
  showModal = false;
  filteredTasks: Task[] = [];

  filter: TaskFilter = {
    status:   'All',
    priority: 'All',
    type:     'All',
    search:   '',
  };

  private destroy$ = new Subject<void>();
  private filterSubject = new BehaviorSubject<TaskFilter>(this.filter);

  // Stats
  totalTasks = 0;
  pendingCount = 0;
  inProgressCount = 0;
  doneCount = 0;
  overdueCount = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    combineLatest([this.taskService.tasks$, this.filterSubject])
      .pipe(
        map(([tasks, f]) => this.applyFilter(tasks, f)),
        takeUntil(this.destroy$),
      )
      .subscribe((tasks) => {
        this.filteredTasks = tasks;
      });

    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.totalTasks    = tasks.length;
        this.pendingCount  = tasks.filter((t) => t.status === 'Pending').length;
        this.inProgressCount = tasks.filter((t) => t.status === 'In progress').length;
        this.doneCount     = tasks.filter((t) => t.status === 'Done').length;
        this.overdueCount  = tasks.filter((t) => this.taskService.isOverdue(t)).length;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterChange(partial: Partial<TaskFilter>): void {
    this.filter = { ...this.filter, ...partial };
    this.filterSubject.next(this.filter);
  }

  onSearchChange(search: string): void {
    this.onFilterChange({ search });
  }

  applyFilter(tasks: Task[], f: TaskFilter): Task[] {
    return tasks.filter((t) => {
      const matchStatus   = f.status   === 'All' || t.status   === f.status;
      const matchPriority = f.priority === 'All' || t.priority === f.priority;
      const matchType     = f.type     === 'All' || t.type     === f.type;
      const matchSearch   = !f.search  ||
        t.title.toLowerCase().includes(f.search.toLowerCase()) ||
        t.lead.toLowerCase().includes(f.search.toLowerCase());
      return matchStatus && matchPriority && matchType && matchSearch;
    });
  }
}
