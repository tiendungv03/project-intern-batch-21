import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

export type MessageBannerType =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'custom';

@Component({
  selector: 'app-message-banner',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './message-banner.component.html',
  styleUrl: './message-banner.component.scss',
})
export class MessageBannerComponent {
  @Input() type: MessageBannerType = 'info';
  @Input() icon = '';
  @Input() iconSize = 20;

  @Input() message = '';
  @Input() actionText = '';

  @Input() showAction = true;
  @Input() showActionIcon = true;
  @Input() customClass = '';
  @Input() hasCustomContent = false;

  @Output() actionClick = new EventEmitter<void>();

  get bannerClass(): string {
    const classes: Record<MessageBannerType, string> = {
      info: 'bg-blue-50 border-blue-200 text-blue-700',
      success: 'bg-green-50 border-green-200 text-green-700',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      danger: 'bg-red-100 border-red-200 text-red-700',
      custom: '',
    };

    return classes[this.type];
  }
}
