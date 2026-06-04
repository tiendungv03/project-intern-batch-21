import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-toolbar.component.html',
})
export class TaskToolbarComponent {
  @Output() openModal = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();

  searchValue = '';

  onSearch() {
    this.searchChange.emit(this.searchValue);
  }

  onCreateTask() {
    this.openModal.emit();
  }
}
