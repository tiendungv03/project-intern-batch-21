import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadProfileHeaderComponent } from './components/lead-profile-header/lead-profile-header.component';
import { LeadAlertBannerComponent } from './components/lead-alert-banner/lead-alert-banner.component';
import { LeadDetailTabsComponent } from './components/lead-detail-tabs/lead-detail-tabs.component';
import { LeadInformationCardComponent } from './components/lead-information-card/lead-information-card.component';
import { LeadRelationshipTableComponent } from './components/lead-relationship-table/lead-relationship-table.component';
import { LeadActivitySidebarComponent } from './components/lead-activity-sidebar/lead-activity-sidebar.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {
  Lead,
  Note,
  Task,
  Comment,
  Relationship,
} from '../../models/interfaces/lead-detail.interface';

@Component({
  selector: 'app-lead-detail',
  standalone: true,
  imports: [
    LeadProfileHeaderComponent,
    LeadAlertBannerComponent,
    LeadDetailTabsComponent,
    LeadInformationCardComponent,
    LeadRelationshipTableComponent,
    LeadActivitySidebarComponent,
    DropdownModule,
    FormsModule,
    CommonModule,
  ],

  templateUrl: './lead-detail.component.html',
  styleUrl: './lead-detail.component.scss',
})
export class LeadDetailComponent implements OnInit {
  lead!: Lead;
  latestNote!: Note;
  nextTask!: Task;
  recentComment!: Comment;
  relationships: Relationship[] = [];

  ngOnInit() {
    this.lead = {
      id: 'DT123456789',
      name: 'Alice Scott',
      otherName: 'Thuỳ An',
      avatarUrl: 'https://i.pravatar.cc',
      bannerUrl: 'assets/images/lead-detail/img_cover.jpg',
      gender: 'Female',
      age: 28,
      dob: '11/10/1989',
      status: 'Follow now',
      leadType: 'Prospect',
      marriedStatus: 'Married',
      policyStatus: 'Active',
      source: 'Funnel',
      subSource: 'Funnel F1',
      email: 'alice.scott&#64;gmail.com',
      phone: '(515) 540-5844',
      address: '2213 Thorn Street<br/>Glenrock, NE 12345',
      mailingAddress: '2213 Thorn Street<br/>Glenrock, NE 12345',
      tags: ['Young', 'Single', 'High class'],
      owner: { name: 'Tian Vo', initials: 'TV' },
      csr: {
        name: 'Handyman',
        initials: 'HM',
        avatarUrl: 'https://i.pravatar.cc/30?u=handyman',
      },
      agent: { name: 'Tian Vo', initials: 'TV' },
      addedBy: { name: 'Emma Le', initials: 'EL' },
      dateAdded: '10/05/2024',
    };

    this.latestNote = {
      id: 'n1',
      badge: 'Interest Prospect',
      content: 'Agreed to send a detailed proposal and a case study.',
      aigCode: 'AIG - PO1289',
      author: { name: 'Emma Le', initials: 'EL' },
      appendsCount: 2,
      date: '07/28/2024 20:45',
    };

    this.nextTask = {
      id: 't1',
      title: 'Consulting customer via phone',
      time: 'Today 08:30 AM',
      assignee: { name: 'Leo Tang', initials: 'LT' },
    };

    this.recentComment = {
      id: 'c1',
      author: { name: 'Emma Le', initials: 'EL' },
      date: '07/28/2024',
      content: 'Agreed to send a detailed proposal and a case study.',
      appendsCount: 2,
    };

    this.relationships = [
      {
        id: 'r1',
        name: 'Mary Thompson',
        avatarUrl: 'https://i.pravatar.cc/100?u=mary',
        leadId: '14315415',
        type: 'Prospect',
        relationship: 'Cousnin',
      },
      {
        id: 'r2',
        name: 'Quinn Evans',
        avatarUrl: 'https://i.pravatar.cc/100?u=quinn',
        leadId: '13213344',
        type: 'Prospect',
        relationship: 'Husband',
      },
      {
        id: 'r3',
        name: 'Sam Wright',
        avatarUrl: 'https://i.pravatar.cc/100?u=sam',
        leadId: '15454166',
        type: 'Prospect',
        relationship: 'Brother',
      },
    ];
  }
}
