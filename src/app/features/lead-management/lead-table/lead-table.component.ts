import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { LeadPaginationComponent } from './lead-pagination/lead-pagination.component';

@Component({
  selector: 'app-lead-table',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    TableModule,
    LeadPaginationComponent,
    SvgIconComponent,
  ],
  templateUrl: './lead-table.component.html',
  styleUrl: './lead-table.component.scss',
})
export class LeadTableComponent implements OnInit {
  constructor(private router: Router) {}
  leads: any[] = [];
  selectedLeads: any[] = [];
  displayedLeads: any[] = [];
  currentPage = 0;
  rows = 15;

  ngOnInit() {
    const baseData = [
      {
        owner: 'John Doe',
        lead: 'Sean Lewis (Huynh Tran)',
        avatar: 'https://i.pravatar.cc/40?img=1',
        showAvatar: true,
        leadType: 'Prospect',
        status: 'Cellphone',
        stage: 'Cellphone',
        contactName: 'Sean Lewis',
        cellphone: '(872) 808-2228',
        work: '(872)',
      },
      {
        owner: 'Mary Johnson',
        lead: 'Heather Phelps (Hanh Nguyen)',
        avatar: null,
        showAvatar: false,
        leadType: 'Prospect',
        status: 'Interest',
        stage: 'Cellphone',
        contactName: 'Hanh Nguyen',
        cellphone: '(431) 863-3901',
        work: '(431)',
      },
      {
        owner: 'Robert White',
        lead: 'Alice Scott (Anh Pham)',
        avatar: 'https://i.pravatar.cc/40?img=3',
        showAvatar: true,
        leadType: 'Customer',
        status: 'Follow now',
        stage: 'Quote & Agent',
        contactName: 'Alice Scott',
        cellphone: '(515) 540-5844',
        work: '(515)',
      },
      {
        owner: 'David Lee',
        lead: 'Kimberly Harper (Kim Phan)',
        avatar: null,
        showAvatar: true,
        leadType: 'Customer',
        status: 'Follow later',
        stage: 'Get Quote',
        contactName: 'Kim Phan',
        cellphone: '(300) 284-5608',
        work: '(300)',
      },
      {
        owner: 'James King',
        lead: 'Chelsea Wilson (Chien Le)',
        avatar: null,
        showAvatar: true,
        leadType: 'Prospect',
        status: 'Stop',
        stage: 'Cellphone',
        contactName: 'Chelsea Wilson',
        cellphone: '(991) 671-7177',
        work: '(991)',
      },
      {
        owner: 'Patricia Taylor',
        lead: 'Christopher Smith (Hoang Phan)',
        avatar: null,
        showAvatar: false,
        leadType: 'Prospect',
        status: 'Closed',
        stage: 'Get Quote',
        contactName: 'Hoang Phan',
        cellphone: '(578) 170-5251',
        work: '(578)',
      },
    ];
    const usedIds = new Set<string>();

    for (let i = 1; i <= 1500; i++) {
      const item = baseData[(i - 1) % baseData.length];

      let leadId = '';
      do {
        leadId = Math.floor(10000000 + Math.random() * 90000000).toString();
      } while (usedIds.has(leadId));

      usedIds.add(leadId);

      this.leads.push({
        ...item,
        leadId,
        owner: `${item.owner} ${i}`,
        lead: `${item.lead} ${i}`,
        avatar: item.avatar
          ? `https://i.pravatar.cc/40?img=${(i % 70) + 1}`
          : null,
      });
    }
    this.updateDisplayedLeads();
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Cellphone':
        return 'bg-blue-100 text-blue-600';
      case 'Interest':
        return 'bg-purple-100 text-purple-600';
      case 'Follow now':
        return 'bg-orange-100 text-orange-600';
      case 'Follow later':
        return 'bg-green-100 text-green-600';
      case 'Stop':
        return 'bg-red-100 text-red-600';
      case 'Closed':
        return 'bg-gray-200 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getAvatarColor(name: string) {
    const colors = [
      'bg-pink-100 text-pink-600',
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
    ];

    return colors[name.charCodeAt(0) % colors.length];
  }
  updateDisplayedLeads() {
    const start = this.currentPage * this.rows;
    const end = start + this.rows;

    this.displayedLeads = this.leads.slice(start, end);
  }

  openLead(leadId: string) {
    this.router.navigate(['/lead', leadId]);
  }

  onPageChange(event: { page: number; rows: number }) {
    this.currentPage = event.page;
    this.rows = event.rows;
    this.updateDisplayedLeads();
  }
}
