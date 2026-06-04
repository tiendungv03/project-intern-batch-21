import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems = [
    {
      title: 'Dashboard',
      icon: 'assets/icons/sidebar/dashboard.svg',
      route: '/dashboard',
      type: 'svg',
      badge: 0,
    },
    {
      title: 'Customers',
      icon: 'assets/icons/sidebar/user.svg',
      route: '/lead-management',
      type: 'svg',
      badge: 0,
    },
    {
      title: 'Calendar',
      icon: 'pi pi-calendar',
      route: '/calendar',
      type: 'class',
      badge: 0,
    },
    {
      title: 'Tasks',
      icon: 'pi pi-check-square',
      route: '/tasks',
      type: 'class',
      badge: 0,
    },
    {
      title: 'Reports',
      icon: 'pi pi-chart-bar',
      route: '/reports',
      type: 'class',
      badge: 0,
    },
    {
      title: 'Spark / AI ',
      icon: 'assets/icons/sidebar/star.svg',
      route: '/Spark',
      type: 'svg',
      badge: 3,
    },
  ];
}
