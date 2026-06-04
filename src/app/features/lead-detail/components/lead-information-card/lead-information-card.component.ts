import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lead } from '../../../../models/interfaces/lead-detail.interface';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-lead-information-card',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './lead-information-card.component.html',
  styleUrl: './lead-information-card.component.scss',
})
export class LeadInformationCardComponent {
  private readonly sampleLeadData: Lead = {
    id: 'TLP-2390',
    name: 'Thomas T. Jack',
    otherName: 'Tom',
    avatarUrl: 'assets/images/lead-detail/profile-avatar.png',
    bannerUrl: 'assets/images/lead-detail/profile-banner.png',
    gender: 'Male',
    age: 32,
    dob: '03/27/1994',
    status: 'Warm',
    leadType: 'Individual',
    marriedStatus: 'Single',
    policyStatus: 'No policy',
    source: 'Website',
    subSource: 'Landing page',
    email: 'thomasjack@gmail.com',
    phone: '404-666-6666',
    workPhone: '',
    address: '123 Main St, Atlanta, GA 30303',
    mailingAddress: 'PO Box 456, Atlanta, GA 30303',
    tags: ['Hot lead', 'Follow up'],
    owner: {
      name: 'Jenny Wilson',
      initials: 'JW',
      avatarUrl: '',
      colorClass: 'bg-blue-100 text-blue-600',
    },
    csr: {
      name: 'Wade Warren',
      initials: 'WW',
      avatarUrl: '',
      colorClass: 'bg-blue-100 text-blue-600',
    },
    agent: {
      name: 'Kristin Watson',
      initials: 'KW',
      avatarUrl: '',
      colorClass: 'bg-purple-100 text-purple-600',
    },
    addedBy: {
      name: 'Ronald Richards',
      initials: 'RR',
      avatarUrl: '',
      colorClass: 'bg-blue-100 text-blue-600',
    },
    dateAdded: '07/25/2025',
  };

  readonly identificationInfo = {
    ssnTaxId: '••••7654',
    driverLicense: 'DE - I1234568',
    greenCardNumber: '---',
  };

  @Input() lead: Lead = this.sampleLeadData;
}
