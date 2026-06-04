import { Component, EventEmitter, Output } from '@angular/core';
import { FormControlComponent } from 'src/app/shared/components/form-control/form-control.component';
import { ButtonModule } from 'primeng/button';
import { SvgIconComponent } from 'angular-svg-icon';
import { SelectButtonModule } from 'primeng/selectbutton';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component';

@Component({
  selector: 'app-schedule-calendar-toolbar',
  standalone: true,
  imports: [
    FormControlComponent,
    ButtonModule,
    SvgIconComponent,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SearchInputComponent,
  ],
  templateUrl: './schedule-calendar-toolbar.component.html',
  styleUrl: './schedule-calendar-toolbar.component.scss',
})
export class ScheduleCalendarToolbarComponent {
  @Output() create = new EventEmitter<void>();

  toolbarForm = new FormGroup({
    search: new FormControl(''),
  });
  selectedView: 'list' | 'calendar' = 'calendar';

  onCreate() {
    this.create.emit();
  }

  onSearch(keyword: string) {
    console.log('Call API với:', keyword);

    // this.service.search(keyword).subscribe(...)
  }
}
