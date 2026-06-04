import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { ScheduleService } from '../../../../services/schedule.service';

@Component({
  selector: 'app-schedule-calendar-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SvgIconComponent,
    DropdownModule,
    TooltipModule,
    CalendarModule,
  ],
  templateUrl: './schedule-calendar-create.component.html',
  styleUrl: './schedule-calendar-create.component.scss',
})
export class ScheduleCalendarCreateComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  createForm!: FormGroup;
  isColorPickerOpen = false;
  currentDateLabel = '';
  currentUserName = 'Current user';
  currentUserAvatar = 'https://ui-avatars.com/api/?name=Current+user&background=random';
  defaultColor = '';

  visibilityOptions = [
    { label: 'Public', value: 'Public' },
    { label: 'Private', value: 'Private' },
    { label: 'Internal', value: 'Internal' },
  ];

  reminderOptions = [
    { label: '5 min before', value: '5 min before' },
    { label: '10 min before', value: '10 min before' },
    { label: '15 min before', value: '15 min before' },
    { label: '30 min before', value: '30 min before' },
    { label: '1 hour before', value: '1 hour before' },
    { label: 'None', value: 'None' },
  ];

  colorOptions = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) {}

  ngOnInit() {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now.getTime() + 30 * 60 * 1000);
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    this.currentDateLabel = `${formattedDate} ${formattedTime}`;

    const storedFullName = localStorage.getItem('fullName')?.trim();
    this.currentUserName = storedFullName || 'Current user';
    this.currentUserAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      this.currentUserName,
    )}&background=random`;
    this.defaultColor = this.colorOptions[Math.floor(Math.random() * this.colorOptions.length)];

    this.createForm = this.fb.group({
      title: [''],
      description: [''],
      start: [start],
      end: [end],
      visibility: ['Public'],
      color: [this.defaultColor],
      reminder: ['5 min before'],
      comment: [''],
    });
  }

  onClose() {
    this.close.emit();
  }

  toggleColorPicker() {
    this.isColorPickerOpen = !this.isColorPickerOpen;
  }

  selectColor(color: string) {
    this.createForm.get('color')?.setValue(color);
    this.isColorPickerOpen = false;
  }

  onSave() {
    const formValue = this.createForm.value;
    const fallbackColor = this.defaultColor;

    const newEvent = {
      title: formValue.title,
      description: formValue.description,
      start: formValue.start,
      end: formValue.end,
      backgroundColor: formValue.color || fallbackColor,
      textColor: '#ffffff',
      lead: {
        name: this.currentUserName,
        avatar: this.currentUserAvatar,
      },
      visibility: formValue.visibility,
      color: formValue.color || fallbackColor,
      createdDate: this.currentDateLabel,
      createdBy: this.currentUserName,
      reminder: formValue.reminder,
    };

    this.scheduleService.addEvent(newEvent);
    this.onClose();
  }
}
