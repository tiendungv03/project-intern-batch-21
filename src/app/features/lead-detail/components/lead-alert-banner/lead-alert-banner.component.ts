import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { MessageBannerComponent } from 'src/app/shared/components/message-banner/message-banner.component';

@Component({
  selector: 'app-lead-alert-banner',
  standalone: true,
  imports: [SvgIconComponent, MessageBannerComponent],
  templateUrl: './lead-alert-banner.component.html',
  styleUrl: './lead-alert-banner.component.scss',
})
export class LeadAlertBannerComponent {
  onViewMore(): void {
    console.log('view more');
  }
}
