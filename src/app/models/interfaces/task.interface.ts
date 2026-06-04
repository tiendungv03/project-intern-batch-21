export type TaskType = 'Call' | 'Email' | 'Meeting' | 'Follow up' | 'Other';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'In progress' | 'Done' | 'Cancelled';

export interface Task {
  id: string;
  title: string;
  lead: string;
  leadId: string;
  type: TaskType;
  priority: TaskPriority;
  dueDate: string; // ISO date string YYYY-MM-DD
  status: TaskStatus;
  notes?: string;
  createdAt: string;
}

export interface TaskFilter {
  status: TaskStatus | 'All';
  priority: TaskPriority | 'All';
  type: TaskType | 'All';
  search: string;
}
