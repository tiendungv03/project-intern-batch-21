import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lead } from '../../../../models/interfaces/lead-detail.interface';

@Component({
  selector: 'app-lead-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lead-profile-header.component.html',
  styleUrl: './lead-profile-header.component.scss',
})
export class LeadProfileHeaderComponent {
  @Input() lead!: Lead;
}
