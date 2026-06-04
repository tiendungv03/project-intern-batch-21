import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFilter } from '../../../models/interfaces/task.interface';

@Component({
  selector: 'app-task-filter-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-filter-bar.component.html',
})
export class TaskFilterBarComponent {
  @Input() filter!: TaskFilter;
  @Output() filterChange = new EventEmitter<Partial<TaskFilter>>();

  statusOptions: Array<{ label: string; value: TaskFilter['status']; color: string; badgeColor: string }> = [
    { label: 'All',        value: 'All',        color: 'border-emerald-600 bg-emerald-600 text-white',             badgeColor: 'bg-white text-emerald-600' },
    { label: 'Pending',    value: 'Pending',    color: 'border-yellow-500 text-yellow-600 bg-white',               badgeColor: 'bg-yellow-100 text-yellow-700' },
    { label: 'In progress',value: 'In progress',color: 'border-blue-500 text-blue-600 bg-white',                   badgeColor: 'bg-blue-100 text-blue-600' },
    { label: 'Done',       value: 'Done',       color: 'border-green-500 text-green-600 bg-white',                 badgeColor: 'bg-green-100 text-green-600' },
    { label: 'Cancelled',  value: 'Cancelled',  color: 'border-gray-400 text-gray-500 bg-white',                   badgeColor: 'bg-gray-100 text-gray-500' },
  ];

  priorityOptions: Array<{ label: string; value: TaskFilter['priority'] }> = [
    { label: 'All Priority', value: 'All' },
    { label: 'High',          value: 'High' },
    { label: 'Medium',        value: 'Medium' },
    { label: 'Low',           value: 'Low' },
  ];

  typeOptions: Array<{ label: string; value: TaskFilter['type'] }> = [
    { label: 'All Types', value: 'All' },
    { label: 'Call',      value: 'Call' },
    { label: 'Email',     value: 'Email' },
    { label: 'Meeting',   value: 'Meeting' },
    { label: 'Follow up', value: 'Follow up' },
    { label: 'Other',     value: 'Other' },
  ];

  setStatus(value: TaskFilter['status']) {
    this.filterChange.emit({ status: value });
  }

  setPriority(event: Event) {
    const val = (event.target as HTMLSelectElement).value as TaskFilter['priority'];
    this.filterChange.emit({ priority: val });
  }

  setType(event: Event) {
    const val = (event.target as HTMLSelectElement).value as TaskFilter['type'];
    this.filterChange.emit({ type: val });
  }

  resetFilters() {
    this.filterChange.emit({ status: 'All', priority: 'All', type: 'All' });
  }
}
