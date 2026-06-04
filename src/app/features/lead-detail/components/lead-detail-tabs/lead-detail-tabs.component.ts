import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';

interface Tab {
  id: string;
  label: string;
}

@Component({
  selector: 'app-lead-detail-tabs',
  standalone: true,
  imports: [TabViewModule, CommonModule],
  templateUrl: './lead-detail-tabs.component.html',
  styleUrl: './lead-detail-tabs.component.scss',
})
export class LeadDetailTabsComponent {
  tabs: Tab[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'notes', label: 'Notes' },
    { id: 'attachments', label: 'Attachments' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'policies', label: 'Policies' },
    { id: 'system-log', label: 'System log' },
  ];

  activeTab: string = 'overview';

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }
}
