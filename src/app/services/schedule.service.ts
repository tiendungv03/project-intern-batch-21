import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ScheduleEvent {
  id?: string;
  title: string;
  description?: string;
  start: Date | string;
  end: Date | string;
  backgroundColor?: string;
  textColor?: string;
  lead?: {
    name: string;
    avatar: string;
  };
  visibility?: string;
  color?: string;
  createdDate?: string;
  createdBy?: string;
  reminder?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private initialEvents: ScheduleEvent[] = [
    {
      title: 'Meeting with client',
      start: '2024-07-08T10:00:00',
      end: '2024-07-08T10:30:00',
      backgroundColor: '#dbeafe',
      textColor: '#1d4ed8',
    },
    {
      title: 'Escape Room Challenge',
      start: '2024-07-08T11:00:00',
      end: '2024-07-08T11:30:00',
      backgroundColor: '#ffedd5',
      textColor: '#c2410c',
    },
    {
      title: 'Volunteer Day',
      start: '2024-07-08T13:00:00',
      end: '2024-07-08T13:30:00',
      backgroundColor: '#8b5cf6',
      textColor: '#ffffff',
    },
    {
      title: 'Corporate Charity Run/Walk',
      start: '2024-07-08T13:15:00',
      end: '2024-07-08T13:45:00',
      backgroundColor: '#dcfce7',
      textColor: '#166534',
    },
    {
      title: 'Themed Costume Party',
      start: '2024-07-10T11:00:00',
      end: '2024-07-10T11:30:00',
      backgroundColor: '#ffedd5',
      textColor: '#c2410c',
    },
    {
      title: 'Trivia Night at a Pub',
      start: '2024-07-10T11:15:00',
      end: '2024-07-10T11:45:00',
      backgroundColor: '#ede9fe',
      textColor: '#6d28d9',
    },
    {
      title: 'Sports Day',
      start: '2024-07-11T14:00:00',
      end: '2024-07-11T14:30:00',
      backgroundColor: '#dcfce7',
      textColor: '#166534',
    },
    {
      title: 'Company-Wide Town Hall',
      start: '2024-07-12T09:00:00',
      end: '2024-07-12T09:30:00',
      backgroundColor: '#dbeafe',
      textColor: '#1d4ed8',
    },
    {
      title: 'Hackathon',
      start: '2024-07-12T09:30:00',
      end: '2024-07-12T10:00:00',
      backgroundColor: '#dcfce7',
      textColor: '#166534',
    },
    {
      title: 'Professional Development Session',
      start: '2024-07-12T10:00:00',
      end: '2024-07-12T10:30:00',
      backgroundColor: '#dbeafe',
      textColor: '#1d4ed8',
    },
  ];

  private eventsSubject = new BehaviorSubject<ScheduleEvent[]>(
    this.initialEvents,
  );
  events$ = this.eventsSubject.asObservable();

  addEvent(event: ScheduleEvent) {
    const currentEvents = this.eventsSubject.value;
    this.eventsSubject.next([...currentEvents, event]);
  }
}
