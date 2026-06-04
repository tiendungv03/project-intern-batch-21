import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly today = new Date().toISOString().split('T')[0];

  private pastDate(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
  }

  private futureDate(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  }

  private initialTasks: Task[] = [
    {
      id: 'T001',
      title: 'Call customer to confirm appointment',
      lead: 'Alice Scott',
      leadId: 'L001',
      type: 'Call',
      priority: 'High',
      dueDate: this.today,
      status: 'Pending',
      notes: 'Customer requested a callback between 9am - 11am.',
      createdAt: this.pastDate(3),
    },
    {
      id: 'T002',
      title: 'Send quotation for property package',
      lead: 'Sean Lewis',
      leadId: 'L002',
      type: 'Email',
      priority: 'Medium',
      dueDate: this.futureDate(1),
      status: 'In progress',
      notes: 'Prepare PDF quotation for 3-bedroom unit.',
      createdAt: this.pastDate(2),
    },
    {
      id: 'T003',
      title: 'Follow up after site visit',
      lead: 'Kim Phan',
      leadId: 'L003',
      type: 'Follow up',
      priority: 'High',
      dueDate: this.futureDate(2),
      status: 'Done',
      notes: 'Customer visited unit B4-12 last weekend.',
      createdAt: this.pastDate(5),
    },
    {
      id: 'T004',
      title: 'Schedule meeting to discuss financing',
      lead: 'Hoang Phan',
      leadId: 'L004',
      type: 'Meeting',
      priority: 'High',
      dueDate: this.pastDate(2),
      status: 'Pending',
      notes: 'Customer interested in installment payment plan.',
      createdAt: this.pastDate(7),
    },
    {
      id: 'T005',
      title: 'Prepare customer profile documents',
      lead: 'Chelsea Wilson',
      leadId: 'L005',
      type: 'Other',
      priority: 'Low',
      dueDate: this.futureDate(5),
      status: 'Pending',
      notes: '',
      createdAt: this.pastDate(1),
    },
    {
      id: 'T006',
      title: 'Send project brochure via email',
      lead: 'Hanh Nguyen',
      leadId: 'L006',
      type: 'Email',
      priority: 'Medium',
      dueDate: this.pastDate(4),
      status: 'Cancelled',
      notes: 'Customer changed contact method to Zalo.',
      createdAt: this.pastDate(10),
    },
    {
      id: 'T007',
      title: 'Call to remind about down payment deadline',
      lead: 'John Doe',
      leadId: 'L007',
      type: 'Call',
      priority: 'High',
      dueDate: this.pastDate(1),
      status: 'Pending',
      notes: 'Payment deadline is critical — escalate if not reached.',
      createdAt: this.pastDate(6),
    },
    {
      id: 'T008',
      title: 'Follow up on submitted loan application',
      lead: 'Mary Johnson',
      leadId: 'L008',
      type: 'Follow up',
      priority: 'Medium',
      dueDate: this.futureDate(3),
      status: 'In progress',
      notes: 'Loan submitted to Vietcombank, waiting for approval.',
      createdAt: this.pastDate(2),
    },
    {
      id: 'T009',
      title: 'On-site walkthrough for unit selection',
      lead: 'Robert White',
      leadId: 'L009',
      type: 'Meeting',
      priority: 'High',
      dueDate: this.futureDate(4),
      status: 'Pending',
      notes: 'Customer wants to see floors 10-15.',
      createdAt: this.pastDate(1),
    },
    {
      id: 'T010',
      title: 'Check and verify customer legal documents',
      lead: 'David Lee',
      leadId: 'L010',
      type: 'Other',
      priority: 'Low',
      dueDate: this.pastDate(3),
      status: 'Done',
      notes: 'All documents verified and filed.',
      createdAt: this.pastDate(8),
    },
    {
      id: 'T011',
      title: 'Send contract draft for review',
      lead: 'Patricia Taylor',
      leadId: 'L011',
      type: 'Email',
      priority: 'High',
      dueDate: this.pastDate(5),
      status: 'Pending',
      notes: 'Draft contract version 2 needs approval.',
      createdAt: this.pastDate(9),
    },
    {
      id: 'T012',
      title: 'Follow up on interest from Facebook ads',
      lead: 'James King',
      leadId: 'L012',
      type: 'Follow up',
      priority: 'Low',
      dueDate: this.futureDate(7),
      status: 'Pending',
      notes: '',
      createdAt: this.today,
    },
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.initialTasks);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  createTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const tasks = this.tasksSubject.getValue();
    const newTask: Task = {
      ...task,
      id: 'T' + (tasks.length + 1).toString().padStart(3, '0'),
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.tasksSubject.next([newTask, ...tasks]);
  }

  updateTaskStatus(taskId: string, status: TaskStatus): void {
    const tasks = this.tasksSubject
      .getValue()
      .map((t) => (t.id === taskId ? { ...t, status } : t));
    this.tasksSubject.next(tasks);
  }

  isOverdue(task: Task): boolean {
    return task.status !== 'Done' && task.status !== 'Cancelled' && task.dueDate < new Date().toISOString().split('T')[0];
  }
}
