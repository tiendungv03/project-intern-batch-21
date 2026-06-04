import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-lead-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-lead-sidebar.component.html',
  styleUrls: ['./create-lead-sidebar.component.scss']
})
export class CreateLeadSidebarComponent {
  activeSection = 'main-contact';

  scrollTo(id: string) {
    this.activeSection = id;
    const el = document.getElementById(id);
    if (!el) return;

    // Try to find the nearest scrollable ancestor; fallback to window
    let container: HTMLElement | null = el.parentElement;
    while (container) {
      const overflowY = window.getComputedStyle(container).overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && container.scrollHeight > container.clientHeight) {
        break;
      }
      container = container.parentElement;
    }

    // Offset to account for headers/padding so the section doesn't jump under fixed headers
    const offset = 64; // px

    if (container) {
      // scroll within container
      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const target = el.getBoundingClientRect().top + window.scrollY - containerTop - offset;
      container.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      const target = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
}
