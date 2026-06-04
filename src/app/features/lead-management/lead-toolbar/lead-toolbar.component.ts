import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
@Component({
  selector: 'app-lead-toolbar',
  standalone: true,
  imports: [SvgIconComponent,RouterModule,CommonModule],
  templateUrl: './lead-toolbar.component.html',
  styleUrl: './lead-toolbar.component.scss'
})
export class LeadToolbarComponent {

}
