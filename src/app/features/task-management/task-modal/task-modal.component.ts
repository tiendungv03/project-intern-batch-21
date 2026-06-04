import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { TaskPriority, TaskStatus, TaskType } from '../../../models/interfaces/task.interface';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.component.html',
})
export class TaskModalComponent {
  @Output() close = new EventEmitter<void>();

  taskForm: FormGroup;

  typeOptions: TaskType[] = ['Call', 'Email', 'Meeting', 'Follow up', 'Other'];
  priorityOptions: TaskPriority[] = ['Low', 'Medium', 'High'];
  statusOptions: TaskStatus[] = ['Pending', 'In progress', 'Done', 'Cancelled'];

  leadOptions = [
    { id: 'L001', name: 'Alice Scott' },
    { id: 'L002', name: 'Sean Lewis' },
    { id: 'L003', name: 'Kim Phan' },
    { id: 'L004', name: 'Hoang Phan' },
    { id: 'L005', name: 'Chelsea Wilson' },
    { id: 'L006', name: 'Hanh Nguyen' },
    { id: 'L007', name: 'John Doe' },
    { id: 'L008', name: 'Mary Johnson' },
    { id: 'L009', name: 'Robert White' },
    { id: 'L010', name: 'David Lee' },
    { id: 'L011', name: 'Patricia Taylor' },
    { id: 'L012', name: 'James King' },
  ];

  submitted = false;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title:    ['', [Validators.required, Validators.minLength(3)]],
      leadId:   ['', Validators.required],
      type:     ['Call', Validators.required],
      priority: ['Medium', Validators.required],
      dueDate:  ['', Validators.required],
      status:   ['Pending', Validators.required],
      notes:    [''],
    });
  }

  get f() { return this.taskForm.controls; }

  getLeadName(id: string): string {
    return this.leadOptions.find((l) => l.id === id)?.name ?? '';
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.taskForm.invalid) return;

    const val = this.taskForm.value;
    this.taskService.createTask({
      title:    val.title,
      lead:     this.getLeadName(val.leadId),
      leadId:   val.leadId,
      type:     val.type,
      priority: val.priority,
      dueDate:  val.dueDate,
      status:   val.status,
      notes:    val.notes,
    });
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).id === 'task-modal-overlay') {
      this.onClose();
    }
  }
}
