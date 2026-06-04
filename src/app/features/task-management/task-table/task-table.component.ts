import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../../models/interfaces/task.interface';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-table.component.html',
})
export class TaskTableComponent implements OnChanges {
  @Input() tasks: Task[] = [];

  statusOptions: TaskStatus[] = ['Pending', 'In progress', 'Done', 'Cancelled'];

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {}

  isOverdue(task: Task): boolean {
    return this.taskService.isOverdue(task);
  }

  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case 'Pending':     return 'bg-yellow-100 text-yellow-700';
      case 'In progress': return 'bg-blue-100 text-blue-600';
      case 'Done':        return 'bg-green-100 text-green-600';
      case 'Cancelled':   return 'bg-gray-100 text-gray-500';
      default:            return 'bg-gray-100 text-gray-400';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High':   return 'bg-red-100 text-red-600';
      case 'Medium': return 'bg-orange-100 text-orange-600';
      case 'Low':    return 'bg-green-100 text-green-600';
      default:       return 'bg-gray-100 text-gray-400';
    }
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'Call':      return 'pi pi-phone';
      case 'Email':     return 'pi pi-envelope';
      case 'Meeting':   return 'pi pi-users';
      case 'Follow up': return 'pi pi-refresh';
      case 'Other':     return 'pi pi-bookmark';
      default:          return 'pi pi-tag';
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = [
      'bg-pink-100 text-pink-600',
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-orange-100 text-orange-600',
    ];
    return colors[name.charCodeAt(0) % colors.length];
  }

  onStatusChange(taskId: string, event: Event): void {
    const status = (event.target as HTMLSelectElement).value as TaskStatus;
    this.taskService.updateTaskStatus(taskId, status);
  }
}
