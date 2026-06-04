import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Note,
  Task,
  Comment,
} from '../../../../models/interfaces/lead-detail.interface';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-lead-activity-sidebar',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './lead-activity-sidebar.component.html',
  styleUrl: './lead-activity-sidebar.component.scss',
})
export class LeadActivitySidebarComponent {
  @Input() note!: Note;
  @Input() task!: Task;
  @Input() comment!: Comment;
}
