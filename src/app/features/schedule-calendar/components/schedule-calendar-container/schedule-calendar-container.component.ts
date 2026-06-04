import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ScheduleService } from '../../../../services/schedule.service';
import { Subscription } from 'rxjs';

type CalendarViewMode = 'timeGridDay' | 'timeGridWeek';

@Component({
  selector: 'app-schedule-calendar-container',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './schedule-calendar-container.component.html',
  styleUrls: ['./schedule-calendar-container.component.scss'],
})
export class ScheduleCalendarContainerComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent?: FullCalendarComponent;
  @ViewChild('timeLabel') timeLabelRef?: ElementRef<HTMLDivElement>;

  private subscription = new Subscription();

  constructor(private scheduleService: ScheduleService) {}

  // =========================
  // Toolbar state
  // =========================
  currentTitle = 'July 2024';

  isViewMenuOpen = false;
  currentView: CalendarViewMode = 'timeGridWeek';

  get currentViewLabel(): string {
    return this.currentView === 'timeGridDay' ? 'Day' : 'Week';
  }

  // thời gian hiện tại hiển thị cạnh line đỏ
  currentTime = '';

  // =========================
  // Calendar options
  // =========================
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: false,
    firstDay: 1,
    weekends: true,
    nowIndicator: true,

    height: 700,
    expandRows: true,

    slotMinTime: '08:00:00',
    slotMaxTime: '17:00:00',
    slotDuration: '01:00:00',
    slotLabelInterval: '01:00:00',

    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },

    allDaySlot: false,
    initialDate: '2024-07-10',

    // nếu bạn đang custom header kiểu Wednesday / 10 tròn xanh thì giữ đoạn này
    dayHeaderContent: (arg) => {
      const date = arg.date;
      const dayNumber = date.getDate();

      const weekday = date.toLocaleDateString('en-US', {
        weekday: 'long',
      });

      const today = new Date('2024-07-10');
      // const today = new Date();
      const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();

      return {
        html: `
          <div class="custom-day-header">
            <div class="custom-day-weekday ${isToday ? 'is-today-text' : ''}">
              ${weekday}
            </div>
            <div class="custom-day-number ${isToday ? 'is-today-number' : ''}">
              ${dayNumber}
            </div>
          </div>
        `,
      };
    },

    eventContent: (arg) => {
      const title = arg.event.title;

      const start = arg.event.start;
      const time = start
        ? start.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        : '';

      return {
        html: `
      <div class="fc-custom-event">
        <span class="fc-custom-event__title">${title}</span>
        <span class="fc-custom-event__time">${time}</span>
      </div>
    `,
      };
    },

    datesSet: (arg) => {
      this.updateTitle(arg.view.title);
      queueMicrotask(() => {
        this.updateCurrentTime();
        this.updateTimePosition();
      });
    },

    events: [],
  };

  // =========================
  // Lifecycle
  // =========================
  ngAfterViewInit() {
    this.subscription.add(
      this.scheduleService.events$.subscribe((events) => {
        this.calendarOptions = {
          ...this.calendarOptions,
          events: events as any,
        };
      }),
    );

    setTimeout(() => {
      this.updateCurrentTime();
      this.updateTimePosition();
    });

    setInterval(() => {
      this.updateCurrentTime();
      this.updateTimePosition();
    }, 60000);
  }

  // =========================
  // Toolbar actions
  // =========================
  toggleViewMenu(): void {
    this.isViewMenuOpen = !this.isViewMenuOpen;
  }

  selectView(view: CalendarViewMode): void {
    this.currentView = view;
    this.isViewMenuOpen = false;

    const api = this.calendarComponent?.getApi();
    if (!api) return;

    api.changeView(view);

    queueMicrotask(() => {
      this.syncTitle();
      this.updateCurrentTime();
      this.updateTimePosition();
    });
  }

  goPrev(): void {
    const api = this.calendarComponent?.getApi();
    if (!api) return;

    api.prev();

    queueMicrotask(() => {
      this.syncTitle();
      this.updateCurrentTime();
      this.updateTimePosition();
    });
  }

  goNext(): void {
    const api = this.calendarComponent?.getApi();
    if (!api) return;

    api.next();

    queueMicrotask(() => {
      this.syncTitle();
      this.updateCurrentTime();
      this.updateTimePosition();
    });
  }

  goToday(): void {
    const api = this.calendarComponent?.getApi();
    if (!api) return;

    api.today();

    queueMicrotask(() => {
      this.syncTitle();
      this.updateCurrentTime();
      this.updateTimePosition();
    });
  }

  // =========================
  // Close dropdown when click outside
  // =========================
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.view-dropdown')) {
      this.isViewMenuOpen = false;
    }
  }

  // =========================
  // Title sync
  // =========================
  updateTitle(_: string): void {
    this.syncTitle();
  }

  private syncTitle(): void {
    const api = this.calendarComponent?.getApi();
    if (!api) return;

    const currentDate = api.getDate();

    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    });

    this.currentTitle = formatter.format(currentDate);
  }

  // =========================
  // Current time label
  // =========================
  private updateCurrentTime(): void {
    const now = new Date();

    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    this.currentTime = formatter.format(now);
  }

  private updateTimePosition(): void {
    if (!this.timeLabelRef) return;

    const host = document.querySelector('.calendar-content');
    const nowLine = document.querySelector('.fc-timegrid-now-indicator-line');
    const axis = document.querySelector('.fc-timegrid-axis');

    if (!host || !nowLine || !axis) {
      this.timeLabelRef.nativeElement.style.display = 'none';
      return;
    }

    const hostRect = (host as HTMLElement).getBoundingClientRect();
    const lineRect = (nowLine as HTMLElement).getBoundingClientRect();
    const axisRect = (axis as HTMLElement).getBoundingClientRect();

    const top = lineRect.top - hostRect.top - 8;
    // const labelHeight = this.timeLabelRef.nativeElement.offsetHeight;

    // const top = lineRect.top - hostRect.top - labelHeight / 2;

    this.timeLabelRef.nativeElement.style.display = 'block';
    this.timeLabelRef.nativeElement.style.top = `${top}px`;

    // canh label vào giữa cột giờ bên trái
    const left = axisRect.left - hostRect.left + 4;
    this.timeLabelRef.nativeElement.style.left = `${left}px`;
  }

  get currentUTC(): string {
    const offset = -new Date().getTimezoneOffset() / 60;
    return `UTC ${offset >= 0 ? '+' : ''}${offset}`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
