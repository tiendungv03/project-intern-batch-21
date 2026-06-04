import { Component } from '@angular/core';
import { ScheduleCalendarToolbarComponent } from './components/schedule-calendar-toolbar/schedule-calendar-toolbar.component';
import { ScheduleCalendarContainerComponent } from './components/schedule-calendar-container/schedule-calendar-container.component';
import { ScheduleCalendarCreateComponent } from './components/schedule-calendar-create/schedule-calendar-create.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-calendar',
  standalone: true,
  imports: [
    ScheduleCalendarToolbarComponent,
    ScheduleCalendarContainerComponent,
    ScheduleCalendarCreateComponent,
    CommonModule,
  ],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.scss',
})
export class ScheduleCalendarComponent {
  isCreateSidebarOpen = false;

  toggleCreateSidebar() {
    this.isCreateSidebarOpen = !this.isCreateSidebarOpen;
  }
}
