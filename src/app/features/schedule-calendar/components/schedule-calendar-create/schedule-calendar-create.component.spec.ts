import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  SvgLoader,
  provideAngularSvgIcon,
} from 'angular-svg-icon';

import { ScheduleCalendarCreateComponent } from './schedule-calendar-create.component';

describe('ScheduleCalendarCreateComponent', () => {
  let component: ScheduleCalendarCreateComponent;
  let fixture: ComponentFixture<ScheduleCalendarCreateComponent>;

  beforeEach(async () => {
    localStorage.setItem('fullName', 'Tony Pham');

    await TestBed.configureTestingModule({
      imports: [ScheduleCalendarCreateComponent],
      providers: [
        provideAngularSvgIcon({
          loader: {
            provide: SvgLoader,
            useValue: {
              getSvg: () => of('<svg></svg>'),
            },
          },
        }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCalendarCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty create form and current user metadata', () => {
    const formValue = component.createForm.value;

    expect(formValue.title).toBe('');
    expect(formValue.description).toBe('');
    expect(formValue.comment).toBe('');
    expect(formValue.visibility).toBe('Public');
    expect(formValue.reminder).toBe('5 min before');
    expect(component.colorOptions).toContain(formValue.color);
    expect(formValue.start instanceof Date).toBeTrue();
    expect(formValue.end instanceof Date).toBeTrue();
    expect(formValue.end.getTime()).toBeGreaterThan(formValue.start.getTime());
    expect(component.currentUserName).toBe('Tony Pham');
    expect(component.currentDateLabel).not.toBe('');
  });
});
